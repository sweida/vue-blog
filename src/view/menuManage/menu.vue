<template>
<div>
  <div class="header_title">菜单管理<i class="el-icon-info"></i></div>
  <el-row :gutter="20" type="flex" class="scroll">
    <el-col :span="20">
      <div class="main-content scroll">
        <div class="main-head">
          <div>
            <label>菜单名称</label>
            <el-input class="sel-input" v-model="menuSel.perName" placeholder="功能名称" size="medium"></el-input>
            <label>系统</label>
            <el-select v-model="menu.osType" placeholder="请选择" @change="selectMenuList">
              <el-option v-for="item in modelOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <el-button-group>
            <el-button size="medium" @click="selectMenuList">查询</el-button>
            <el-button size="medium" type="success" @click="goMenuAdd">新增</el-button>
            <el-button size="medium" type="danger" @click="delsMenu">批量删除</el-button>
            <el-button size="medium" type="primary" @click="enableSMenu">批量删除</el-button>
          </el-button-group>
        </div>
        <el-table :data="menuList" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" size="mini" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange">
          <el-table-column type="selection" fixed>
          </el-table-column>
          <el-table-column type="index" label="编号">
          </el-table-column>
          <el-table-column prop="perName" label="名称">
          </el-table-column>
          <el-table-column prop="treeid" label="排序">
          </el-table-column>
          <el-table-column prop="perUrl" label="地址">
          </el-table-column>
          <el-table-column label="级别">
            <template slot-scope="scope">
                {{scope.row.menuLevel | menuLevelFilter(menuLevelMap)}}
              </template>
          </el-table-column>
          <el-table-column prop="superiorMenuid" label="父菜单ID">
          </el-table-column>
          <el-table-column label="父菜单">
            <template slot-scope="scope">
                <el-tag :type="scope.row.isparent | tagFilter(statusMap)">
                  {{scope.row.isparent | statusFilter(statusDisplay)}}
                </el-tag>
              </template>
          </el-table-column>
          <el-table-column prop="showPosition" label="顺序">
          </el-table-column>
          <el-table-column label="删除" align="center">
            <template slot-scope="scope">
                <el-tag :type="scope.row.deleted | tagFilter(statusMap)">{{scope.row.deleted | statusFilter(statusDisplay)}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="scope">
                <el-button-group>
                  <el-button size="mini" @click="editMenu(scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" v-if="scope.row.deleted==0" @click="delMenu(scope.row)">删除
                  </el-button>
                  <el-button size="mini" type="primary" v-if="scope.row.deleted==1" @click="enableMenu(scope.row)">启用
                  </el-button>
                </el-button-group>
              </template>
          </el-table-column>
        </el-table>
        <page :pageModel="pageModel" @selectList="selectMenuList"></page>
      </div>
    </el-col>
    <el-col :span="4">
      <el-menu background-color="#d3d8e1" active-text-color="#409eff" unique-opened id="menu-list">
        <template v-for="m in lmenu">
            <el-menu-item :index="m.url" v-if="!m.parent">
              <i class="iconfont" v-bind:class="m.icon"></i>
              <span slot="title">{{m.label}}</span>
            </el-menu-item>

            <el-submenu :index="m.url" v-if="m.parent">
              <template slot="title">
                <i class="iconfont" v-bind:class="m.icon"></i>
                <span slot="title">{{m.label}}</span>
              </template>
        <template v-for="c in m.children">
                <el-menu-item :index="c.url">
                  <template slot="title">
                    <el-row>
                      <i class="iconfont" v-bind:class="c.icon"></i>
                      <span>{{c.label}}</span>
                    </el-row>
                  </template>
        </el-menu-item>
        </template>
        </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
  <el-dialog :title="title" :visible.sync="menuEdDialog" width="30%" @close="menuEdDialogClose" center>
    <el-form ref="menu" :rules="rules" :model="menu" label-width="80px">
      <el-form-item label="所属模块">
        <el-select v-model="menu.osType" placeholder="请选择" @change="getMenuTree">
          <el-option v-for="item in modelOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称" class="el-form-item-input" prop="perName">
        <el-input style="width: 50%" v-model="menu.perName"></el-input>
      </el-form-item>
      <el-form-item label="菜单地址" class="el-form-item-input" prop="perUrl">
        <el-input style="width: 50%" v-model="menu.perUrl"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径" class="el-form-item-input" prop="component">
        <el-input style="width: 50%" v-model="menu.component"></el-input>
      </el-form-item>
      <el-form-item label="菜单类型" class="el-form-item-input" prop="perType">
        <el-radio v-model="menu.perType" label="0">菜单</el-radio>
        <el-radio v-model="menu.perType" label="2">按钮</el-radio>
      </el-form-item>
      <el-form-item label="父菜单" class="el-form-item-input" v-if="menu.perType==0">
        <el-cascader v-model="arrParent" clearable expand-trigger="hover" filterable :options="lmenu" :props="parentProps" change-on-select @change="parentChange"></el-cascader>
      </el-form-item>
      <el-form-item label="排序" v-if="menu.perType==0">
        <el-select v-model="menu.showPosition" placeholder="请选择">
          <el-option v-for="item in sortOption" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="功能权限">
        <div>
          <el-button type="primary" plain size="mini" @click="authButDialog=!authButDialog">添加权限</el-button>
        </div>
        <el-dialog width="15%" title="添加权限" :visible.sync="authButDialog" append-to-body center top="15%">
          <el-input v-model="authBut.authIden" style="margin-bottom: 10px" placeholder="请输入标识" clearable size="mini">
          </el-input>
          <el-input v-model="authBut.authName" placeholder="请输入名称" clearable size="mini">
          </el-input>
          <span slot="footer" class="dialog-footer">
              <el-button size="mini" @click="authButDialog = !authButDialog">取 消</el-button>
              <el-button size="mini" type="primary" @click="addAuthBut">保存</el-button>
            </span>
        </el-dialog>
        <el-tag style="margin-right: 5px;" v-for="fun in funs" :key="fun.authIden" closable size="small" @close="handleClose(fun)">
          {{fun.authName}}
        </el-tag>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="menu.perDesc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="menuEdDialog = !menuEdDialog">取 消</el-button>
        <el-button type="warning" @click="resetForm('menu')">重置</el-button>
        <el-button type="primary" @click="submitForm('menu')">保存</el-button>
      </span>
  </el-dialog>
</div>
</template>

<script>
import {
  getMenuListPage,
  getMenuTree,
  delMenu,
  delSMenu,
  getMenuById,
  getMenuSortByParentId,
  addMenu,
  editMenu,
  getAuthMenuById,
  enableMenu,
  enableSMenu
} from '@/api/menu';
import { getFunJson, getFunButJson } from '@/api/menu'
import page from '@/components/common/page'

export default {
  name: "menuList",
  components: {
    page
  },
  data() {
    var checkSort = (rule, value, callback) => {
      if (!this.menu.showPosition) {
        return callback(new Error('请选择排序'));
      } else {
        callback();
      }
    };
    var checkParent = (rule, value, callback) => {
      if (!this.menu.superiorMenuid) {
        return callback(new Error('请选择父菜单'));
      } else {
        callback();
      }
    };
    return {
      lmenu: [],
      parentProps: {
        children: 'children',
        label: 'label',
        value: 'id'
      },
      loading: false,
      menuSel: {
        perName: ''
      },
      pageModel: { //分页实体
        page: 1,
        rows: 10,
        sumCount: 0
      },
      modelOptions: [{
        value: '0',
        label: '客户'
      }, {
        value: '1',
        label: '设定'
      }],
      menuList: [],
      sumCount: 0,
      multipleSelection: [],
      menuEdDialog: false, //dialog
      authButDialog: false, //添加权限的
      title: '', //dialog 的标题
      isEdit: false, //是否是修改视图
      authBut: {
        url: '',
        name: ''
      },
      arrParent: [],
      menu: {
        id: '',
        osType: '0',
        arrParent: '',
        perName: '',
        perType: '0',
        perIcon: '',
        perUrl: '',
        superiorMenuid: '',
        showPosition: '',
        menuLevel: '',
        perDesc: '',
        isparent: '',
        authMenus: []
      }, //菜单对象
      options: [],
      mfuns: [], //子菜单的按钮集合
      funs: [], //按钮权限集合
      rules: {
        perName: [{
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'change,blur'
          }
        ],
        perUrl: [{
            required: true,
            message: '请输入菜单地址',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 30,
            message: '长度在 3 到 15 个字符',
            trigger: 'change,blur'
          }
        ],
        sort: [{
          required: true,
          validator: checkSort,
          trigger: 'change'
        }],
        parent: [{
          required: true,
          validator: checkParent,
          trigger: 'change'
        }],
      },
      sortOption: [],
    }
  },
  computed: {
    statusMap() {
      return this.$store.state.app.status.statusMap;
    },
    statusDisplay() {
      return this.$store.state.app.status.statusDisplay;
    },
    menuLevelMap() {
      return this.$store.state.app.status.menuLevelMap;
    }
  },
  filters: {
    tagFilter(type, statusMap) {
      return statusMap[type]
    },
    statusFilter(status, statusDisplay) {
      return statusDisplay[status]
    },
    menuLevelFilter(level, menuLevelMap) {
      return menuLevelMap[level]
    }
  },
  methods: {
    getMenuTree() {
      let selMenu = {
        osType: this.menu.osType
      }
      getMenuTree(selMenu).then((res) => {
        this.lmenu = res.data.data
      })
    },
    //获取数据
    selectMenuList() {
      this.loading = true
      this.menuSel.osType = this.menu.osType
      getMenuListPage(this.pageModel, this.menuSel).then(res => {
        this.loading = false
        if (res.data.code == 0) {
          this.pageModel.sumCount = res.data.data.total
          this.menuList = res.data.data.rows
        }
      })
      this.getMenuTree()
    },
    //行变色
    tableRowClassName(row, index) {
      if (row.menuLevel === 1) {
        return 'info-row'
      } else if (row.menuLevel === 2) {
        return 'positive-row'
      }
      return ''
    },
    //跳转到新增页面
    goMenuAdd() {
      this.menuEdDialog = true
      this.getFunBut()
      this.getFun()
      this.title = "新增菜单"
    },
    //修改菜单
    editMenu(row) {
      this.menuEdDialog = true
      this.title = "修改菜单"
      this.menu.id = row.id
      this.getFunBut()
      this.getFun()
      this.getMenuById()
      this.isEdit = true
    },
    menuEdDialogClose() {
      this.getMenuTree()
      this.menu.id = ''
      this.$refs['menu'].resetFields()
      this.menu.showPosition = ''
      this.menu.perDesc = ''
      this.arrParent = []
      this.selectMenuList()
    },
    parentChange(val) {
      this.menu.menuLevel = val.length + 1;
      this.menu.superiorMenuid = val.length == 0 ? 0 : val[val.length - 1];
      getMenuSortByParentId(this.menu.superiorMenuid).then(res => {
        if (res.data.code == 0) {
          var sorts = res.data.data;
          this.sortOption.forEach((sort) => {
            sort.disabled = false;
            sorts.forEach((item) => {
              if (item.showPosition == sort.value) {
                sort.disabled = true;
                if (item.showPosition == this.menu.showPosition) {
                  this.menu.showPosition = null;
                }
              }
            });
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    },
    getFunBut() {
      getFunButJson().then(res => {
        this.sortOption = res.data;
      })
    },
    getFun() {
      if (this.menu.id) {
        getAuthMenuById(this.menu.id).then((res) => {
          if (res.data.code == 0) {
            this.funs = res.data.data;
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        });
      } else {
        getFunJson().then(res => {
          this.funs = res.data;
        })
      }
    },
    addAuthBut() {
      let auth = {
        authIden: this.authBut.authIden,
        authName: this.authBut.authName
      };
      this.funs.push(auth);
    },
    handleClose(fun) {
      this.funs.splice(this.funs.indexOf(fun), 1);
    },
    //批量删除菜单
    delsMenu() {
      if (this.multipleSelection.length === 0) {
        this.$message({ message: "请选择要删除的菜单" });
        return;
      }
      this.$confirm('确认删除选中的菜单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = [];
        this.multipleSelection.forEach((item) => {
          ids.push(item.id);
        });
        delSMenu(ids).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.selectMenuList();
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        });
      }, () => {});
    },
    //批量启用菜单
    enableSMenu() {
      if (this.multipleSelection.length === 0) {
        this.$message({ message: "请选择要启用的菜单" });
        return;
      }
      this.$confirm('确认启用选中的菜单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = [];
        this.multipleSelection.forEach((item) => {
          ids.push(item.id);
        });
        enableSMenu(ids).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.selectMenuList();
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        });
      }, () => {});
    },
    //删除菜单
    delMenu(row) {
      this.$confirm('确认删除该菜单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMenu(row.id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.selectMenuList();
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        });
      }, () => {});
    },
    //启用菜单
    enableMenu(row) {
      this.$confirm('确认启用该菜单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        enableMenu(row.id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.selectMenuList();
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        });
      }, () => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getMenuById() {
      getMenuById(this.menu.id).then((res) => {
        if (res.data.code == 0) {
          this.menu = res.data.data;
          let arr = [];
          if (this.menu.arrParent.length > 1) {
            arr = this.menu.arrParent.split(",");
          } else {
            arr.push(this.menu.arrParent)
          }
          this.arrParent = arr.map((item) => {
            return +item
          });
          console.log(this.arrParent)
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      });
    },
    submitForm(formName) {
      this.menu.arrParent = this.arrParent.join(",")
      this.menu.authMenus = this.funs
      if (!this.menu.superiorMenuid) {
        this.menu.menuLevel = 1
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.menu.id) {
            console.log(111, this.menu)
            addMenu(this.menu).then(res => {
              if (res.data.code == 0) {
                this.$message({
                  message: res.data.msg,
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.menuEdDialog = false;
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
            editMenu(this.menu).then(res => {
              if (res.data.code == 0) {
                this.$message({
                  message: res.data.msg,
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.menuEdDialog = false;
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
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      if (this.isEdit) {
        this.getMenuInfo();
      }
    },
  },
  //加载执行
  created() {
    this.selectMenuList();
  }
}
</script>

<style scoped lang="scss">
.main-content {
    .main-head {
        color: #5e6d82;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 1170px;
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

.el-table .info-row {
    background: #c9e5f5;
}

.el-table .positive-row {
    background: #e2f0e4;
}

.page {
    text-align: center;
    margin-top: 20px;
}

#menu-list {
    margin-right: 30px;
    margin-top: 25px;
}
</style>
