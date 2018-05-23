<template>
<div>
  <el-button type="primary" size="small" @click="add()">新增</el-button>
  <el-table
    :data="tableData"
    size="small"
    >
    <el-table-column
      prop="index"
      label="序号">
    </el-table-column>
    <el-table-column
      prop="name"
      label="分类昵称">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="danger" size="mini">删除</el-button>
        <el-button @click="setData(scope.row)" type="primary" size="mini">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block" style="margin-top:20px;">
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        total:1,
        pageNum_:1,
        removeDataID:"",
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      handleCurrentChange(val) {
        this.pageNum_=val;
        this.getData();
      },
      handleClick(row) {
        this.removeDataID=row.id;
         this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.removeData();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      getData(){
          this.$http.post("http://118.190.32.141/CodeIgniter/Base/get_list",{
              data:{},
              token:sessionStorage.getItem("token"),
              pageNum:this.pageNum_,
              pageSize:10,
              table_name:"program_type"
          },{
              emulateJSON:false
          }).then(function(msg){
              if(msg.data.success){
                var this_=this;
                this.total=msg.data.total;
                this.tableData=[]
                msg.data.data.forEach(function(item,index) {
                  this_.tableData.push({
                      index:index+1,
                      name:item.program_type_name,
                      id:item.id
                  })
                })
              }
          })
      },
      setData(row){
          this.$prompt('请输入修改值', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValue:row.name
          }).then(({ value }) => {
             this.$http.post("http://118.190.32.141/CodeIgniter/Base/edit",{
            data:{
              id:row.id,
              program_type_name:value,
            },
            table_name:"program_type",
            token:sessionStorage.getItem("token")
            }).then(function(msg){
              if(msg.data.success){
                  this.$message({
                  type: 'success',
                  message: "修改成功"
                });
                 this.getData()
              }else{
                this.$message({
                type: 'info',
                message: "修改失败"
              });
              }              
          })
          })
      },
      removeData(){
        this.$http.post("http://118.190.32.141/CodeIgniter/Base/del",{
          data:{
            id:this.removeDataID,
          },
          pageNum:this.pageNum_,
          pageSize:10,
          table_name:"program_type"
        }).then(function(msg){
          if(msg.data.success){
            this.getData()
          }
        })      
      },
      add(){
        this.$prompt('请输入新增类型', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$http.post("http://118.190.32.141/CodeIgniter/Base/add",{
            data:{
              program_type_name:value,
            },
            table_name:"program_type",
            token:sessionStorage.getItem("token")
          }).then(function(msg){
              if(msg.data.success){
                this.$message({
                type: 'success',
                message: "添加成功"
              });
            this.getData()              
              }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        })
      }
    }
  }
</script>

