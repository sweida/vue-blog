<template>
  <div>
    <div class="header_title">职位权限</div>
    <div class="main-content scroll">
      <div class="main-head">
        <div>
          <label>职位名称</label>
          <el-input v-model="roleSel.rolename" placeholder="请输入职位名称" size="medium"></el-input>
        </div>
        <el-button-group>
          <el-button size="medium" type="" @click="selectRoleList">查询</el-button>
          <el-button size="medium" type="success" @click="goRoleAdd">新增</el-button>
          <el-button size="medium" type="danger" @click="delsRole">批量删除</el-button>
          <el-button size="medium" type="primary" @click="enableSRole">批量启用</el-button>
        </el-button-group>
      </div>
      <div class="room_table">
        <el-table v-if="roleList"
                  :data="roleList"
                  style="width: 100%"
                  v-loading="loading"
                  size="mini"
                  element-loading-text="拼命加载中"
                  :row-class-name="tableRowClassName"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" label="编号" width="65" align="center">
          </el-table-column>
          <el-table-column prop="rolename" label="角色名称" align="center">
          </el-table-column>
          <el-table-column label="删除" width="65" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.deleted | tagFilter(statusMap)">{{scope.row.deleted |
                statusFilter(statusDisplay)}}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="140" align="center">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" @click="editRole(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" v-if="scope.row.deleted==0" @click="delRole(scope.row)">删除
                </el-button>
                <el-button size="mini" type="primary" v-if="scope.row.deleted==1" @click="enableRole(scope.row)">启用
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <page :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></page>
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="roleEdDialog"
      width="60%"
      height="80%"
      @close="roleEdDialogClose"
      center>
      <div id="roleed">
        <el-form ref="role" :rules="rules" :model="role" label-width="80px">
          <el-form-item label="角色名" class="el-form-item-input" prop="rolename">
            <el-input v-model="role.rolename"></el-input>
          </el-form-item>

          <el-form-item label="权限" class="el-form-item-input">
            <!-- 角色权限面板 -->
            <div class="role-permission-panel">
              <ul class="role-permission-table">
                <li class="role-permission-header">
                  <div class="role-permission-item left-menu">菜单列表</div>
                  <div class="role-permission-item right-operates">功能权限</div>
                </li>
              </ul>
              <el-tree v-loading="treeLoading"
                       ref="menuTree"
                       :data="menu"
                       :props="defaultProps"
                       show-checkbox
                       node-key="id"
                       default-expand-all
                       :current-node-key="0"
                       :highlight-current="true"
                       :expand-on-click-node="false"
                       :check-strictly="false"
                       :render-content="renderContent"
                       @check-change="permissionCheckChange"
                       class="role-tree scroll">
              </el-tree>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleEdDialog = !roleEdDialog">取 消</el-button>
        <el-button type="warning" @click="resetForm('role')">重置</el-button>
        <el-button type="primary" @click="submitForm('role')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getRoleListPage,
    delRole,
    delsRole,
    enableRole,
    enableSRole,
    getRoleById,
    addRole,
    editRole
  } from '@/api/role';

  import {getAllMenu, getRoleMenuById} from '@/api/menu'
  import {delModel, enableModel} from '@/utils/common'
  import page from '@/components/common/page'

  export default {
    name: "roleList",
    components: {
      page
    },
    data() {
      return {
        loading: false,//表格加载
        treeLoading: false,//树形菜单加载
        roleSel: {
          rolename: ''
        },//搜索
        pageModel: {//分页实体
          page: 1,
          rows: 10,
          sumCount: 0,
        },
        roleList: [],//表格数据
        multipleSelection: [],//表格多选
        roleEdDialog: false,//dialog
        title: '',//dialog 的标题
        isEdit: false,//是否是修改视图
        role: {//角色实体
          id: '',
          rolename: '',
          menus: []
        },
        rules: {//验证
          rolename: [{
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 10,
            message: '长度在 1 到 10 个字符',
            trigger: 'change,blur'
          }
          ]
        },
        menu: [],//树形菜单数据
        auths: [],//选择的按钮权限
        defaultProps: {
          children: 'children',
          label: 'label'
        },//树形菜单展示
        authType: false,//当前类型是否是按钮
      }
    },
    computed: {
      statusMap() {
        return this.$store.state.app.status.statusMap;
      },
      statusDisplay() {
        return this.$store.state.app.status.statusDisplay;
      },
      menus() {
        let treeIds = this.$refs.menuTree.getCheckedKeys();
        this.$refs.menuTree.getCheckedNodes().forEach((node) => {
          if (treeIds.indexOf(node.parentId) < 0 && node.parentId != 0) {
            treeIds.push(node.parentId);
          }
        });
        this.auths.forEach((auth) => {
          treeIds.push(auth);
        });
        return treeIds;
      }
    },
    filters: {
      tagFilter(type, statusMap) {
        return statusMap[type]
      },
      statusFilter(status, statusDisplay) {
        return statusDisplay[status]
      }
    },
    watch: {
      treeLoading(val) {
        if (this.isEdit && !val) {
          this.getRoleInfo();
          this.getRoleMenuById();
        }
      }
    },
    methods: {
      //获取数据
      selectRoleList() {
        this.loading = true;
        getRoleListPage(this.pageModel, this.roleSel).then(res => {
          this.loading = false;
          if (res.data.code == 0) {
            this.pageModel.sumCount = res.data.data.total;
            this.roleList = res.data.data.rows;
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
      },
      //行变色
      tableRowClassName(row, index) {
        if (row.deleted == 1) {
          return 'err-row';
        }
        return '';
      },
      //跳转到新增页面
      goRoleAdd() {
        this.roleEdDialog = true;
        this.isEdit = false;
        this.getAllMenu();
        this.title = "新增角色";
        console.log(this.role)
      },
      //修改角色
      editRole(row) {
        this.roleEdDialog = true;
        this.title = "修改角色";
        this.isEdit = true;
        this.role.id = row.id;
        this.getAllMenu();
      },
      //删除角色
      delRole(row) {
        this.$confirm('确认删除该角色吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delRole(row.id).then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.selectRoleList();
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          });
        }, () => {
        });
      },
      //批量删除角色
      delsRole() {
        if (this.multipleSelection.length === 0) {
          this.$message({message: "请选择要删除的角色"});
          return;
        }
        this.$confirm('确认删除选中的角色吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          this.multipleSelection.forEach((item) => {
            ids.push(item.id);
          });
          delsRole(ids).then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.selectRoleList();
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          });
        }, () => {
        });
      },
      //启用角色
      enableRole(row) {
        this.$confirm('确认启用该角色吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          enableRole(row.id).then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.selectRoleList();
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          });
        }, () => {
        });
      },
      //批量启用角色
      enableSRole() {
        if (this.multipleSelection.length === 0) {
          this.$message({message: "请选择要启用的角色"});
          return;
        }
        this.$confirm('确认启用选中的角色吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          this.multipleSelection.forEach((item) => {
            ids.push(item.id);
          });
          enableSRole(ids).then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.selectRoleList();
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          });
        }, () => {
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getAllMenu() {
        this.treeLoading = true;
        getAllMenu().then(res => {
          if (res.data.code == 0) {
            this.menu = res.data.data;
            this.treeLoading = false;
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
      },
      getRoleInfo() {
        getRoleById(this.role.id).then(res => {
          if (res.data.code == 0) {
            this.role = res.data.data;
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
      },
      getRoleMenuById() {
        getRoleMenuById(this.role.id).then(res => {
          if (res.data.code == 0) {
            let menus = [];
            res.data.data.forEach((menu) => {
              menus.push(menu.permissionid);
            });
            this.role.menus = menus;
            this.authType = true;
            this.$refs.menuTree.setCheckedKeys(menus);
            this.$refs.menuTree.getCheckedNodes().forEach((node) => {
              if (node.authNodeList) {
                node.authNodeList.forEach((item) => {
                  if (this.role.menus.indexOf(item.id) > -1) {
                    item.checked = true;
                  }
                });
              }
            });
            this.authType = false;
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
      },
      roleEdDialogClose() {
        this.menu = [];
        this.role.id = '';
        this.$refs['role'].resetFields();
        this.role.menus = [];
        this.auths = [];
        this.$refs.menuTree.setCheckedKeys([]);
        this.selectRoleList();
      },

      submitForm(formName) {
        this.role.menus = this.menus;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.role.id) {
              addRole(this.role).then(res => {
                if (res.data.code == 0) {
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      this.roleEdDialog = false;
                    }
                  });
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: 'error'
                  });
                }
              });
            } else {
              editRole(this.role).then(res => {
                if (res.data.code == 0) {
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      this.roleEdDialog = false;
                    }
                  });
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: 'error'
                  });
                }
              });
            }
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        if (this.isEdit) {
          this.getRoleInfo();
        }
      },
      //选择菜单
      permissionCheckChange(data, isChecked) {
        if (!this.authType) {
          let node = this.$refs.menuTree.store.getNode(data.id);
          if (node.data.parent) {
            if (node.data.authNodeList) {
              node.data.authNodeList.forEach((node) => {
                node.checked = isChecked;
                if (node.checked) {
                  this.auths.push(node.id);
                } else {
                  let index = this.auths.indexOf(node.id);
                  this.auths.splice(index, 1);
                }
              });
            }
          }
        }

      },

      //渲染
      renderContent(createElement, {node, data, store}) {
        let self = this;
        this.menuTreeStore = store;
        let elements = [];
        let span = [];

        let children = data.authNodeList;
        if (children && !data.parent) {
          let btnNode = null;
          for (let i = 0; i < children.length; i++) {
            btnNode = children[i];
            elements.push(this.createOperateElement(self, createElement, btnNode));
          }
        }


        //显示标题
        let label = createElement('span', {
          on: {
            click: function () {
              node.expanded = !node.expanded;
            }
          }
        }, node.label);
        span.push(label);

        //操作面板
        if (children && !data.parent) {
          let operatePanel = createElement('span', {
            attrs: {
              class: 'role-auth',
              id: 'auth_parent_' + data.id,
            }
          }, elements);
          span.push(operatePanel)
        }

        return createElement('span', {
          attrs: {
            class: 'role-span'
          }
        }, span);
      },
      // 创建操作按钮
      createOperateElement(self, createElement, btnNode) {
        let checkBoxEle = createElement('el-checkbox', {
          attrs: {
            value: btnNode.checked
          },
          on: {
            change: () => {
              btnNode.checked = !btnNode.checked;
              if (btnNode.checked) {
                this.auths.push(btnNode.id);
                self.authType = true;
                let checkedKeys = self.$refs.menuTree.getCheckedKeys();
                checkedKeys.push(btnNode.parentId);
                self.$refs.menuTree.setCheckedKeys(checkedKeys);
              } else {
                let index = this.auths.indexOf(btnNode.id);
                this.auths.splice(index, 1);
              }
              setTimeout(() => {
                this.authType = false;
              }, 1);
            }
          }
        }, btnNode.label);
        return checkBoxEle;
      }
    },
    //加载执行
    created() {
      this.selectRoleList();
    }
  }
</script>

<style>
  .role-auth {
    float: right;
    margin-left: 130px;
  }

  .role-span {
    width: 100%;
  }

  .role-auth .el-checkbox + .el-checkbox {
    margin-left: 15px;
  }

  .role-auth .el-checkbox__label {
    padding-left: 5px;
  }
</style>
<style scoped lang="scss">
  .main-content {
    .main-head {
      color: #5e6d82;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 800px;
      span {
        padding-left: 10px;
        color: #99a9c0;
      }
    }
    .room_table {
      width: 800px;
    }
    .el-input {
      width: 150px;
    }
    .el-select {
      width: 100px;
    }
  }

  .role-permission-table {
    border-bottom: none;
    padding: 0;
    position: relative;
    margin: 0;
    list-style-type: none;
  }

  .role-permission-panel > ul.role-permission-table {
    border: 1px solid #e0e0e0;
  }

  .role-permission-header {
    height: 40px;
    line-height: 40px;
    background: #F8F8F9;
    text-align: left;
    padding-right: 17px;
  }

  .role-permission-header .role-permission-item {
    padding: 0;
    text-align: center;
    min-height: 39px;
  }

  .left-menu {
    display: inline-block;
    vertical-align: middle;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-right: 0;
    border-right: 1px solid #e0e0e0;
    padding-top: 10px;
    width: 25%;
    padding-left: 10px;
    user-select: none;
    cursor: pointer;
  }

  .right-operates {
    display: inline-block;
    vertical-align: middle;
    width: 74%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: -3px;
    padding-top: 10px;
  }

  .role-tree {
    max-height: 300px;
    overflow: auto;
    border-bottom: 1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
  }
</style>
