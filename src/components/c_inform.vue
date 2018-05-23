<template>
<div>
  <el-table
    :data="tableData"
    size="small"
    >
    <el-table-column
      prop="index"
      label="序号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="消息昵称"
      width="140">
    </el-table-column>
    <el-table-column
      prop="content"
      label="消息内容"
      width="250">
    </el-table-column>
    <el-table-column
      prop="clearTime"
      label="创建时间"
      width="200">
    </el-table-column>
    <el-table-column
      prop="clearuser"
      label="创建人"
      width="200">
    </el-table-column>
    <el-table-column
      label="操作"
      width="164">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block" style="margin-top:20px;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      @prev-click="prev_click()"
      @next-click="next_click()"
      layout="prev, pager, next"
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
        total:"1",
        pageNum_:1
      }
    },
    mounted(){
      this.getData();
      console.log(this)
    },
    methods: {
      prev_click(){
        this.pageNum_--;
        this.getData()
      },
      next_click(){
        this.pageNum_++;
        this.getData()        
      },
      handleClick(row) {
        console.log(row);
      },
      getData(){
          this.$http.post("http://118.190.32.141/CodeIgniter/Base/get_list",{
              data:{},
              token:sessionStorage.getItem("token"),
              pageNum:this.pageNum_,
              pageSize:10,
              table_name:"lkhd_app_user_notice"
          },{
              emulateJSON:false
          }).then(function(msg){
              if(msg.data.success){
                var this_=this;
                this.total=msg.data.total
                msg.data.data.forEach(function(item,index) {
                  this_.tableData.push({
                      index:index+1,
                      name:item.name,
                      content:item.notice_message,
                      clearTime:item.createTime,
                      clearuser:item.created_user
                  })
                })
              }
          })
      }
    }
  }
</script>

