<template>
    <div class="pos">
        <el-row>
            <el-col :span="7" class="pos-order" id="pos-order">
                <el-tabs>
                    <el-tab-pane label="点餐">
                        <el-table border style="width:100%" :data="tableData">
                            <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                            <el-table-column prop="count" label="数量" width="50"></el-table-column>
                            <el-table-column prop="price" label="金额" width="70"></el-table-column>
                            <el-table-column  label="操作" fixed="right" width="100">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="delGoods(scope.row)">删除</el-button>
                                    <el-button type="text" size="small"  @click="addOrderList(scope.row)">添加</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="totalDiv">
                            <span>数量:{{totalCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>总价:{{totalMoney}}</span>
                        </div>
                    </el-tab-pane>
                    <div class="divbtn">
                        <el-button type="warning">挂单</el-button>
                        <el-button type="danger" @click="deleteAll">删除</el-button>
                        <el-button type="success" @click="invoicing">结账</el-button>
                    </div>
                    <el-tab-pane label="挂单">
                        挂单
                    </el-tab-pane>
                    <el-tab-pane label="外卖">
                        外卖
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="17">
                <div class="often-goods">
                    <div class="title">常用商品</div>
                    <div class="goodsList">
                        <ul>
                            <li v-for="(list,goodsId) in oftenGoods" :key="goodsId" @click="addOrderList(list)">
                                <span>{{list.goodsName}}</span><span class="price">￥{{list.price}}元</span></li>
                        </ul>
                    </div>
                </div>
                <div class="goods-type">
                    <el-tabs>
                        <el-tab-pane label="汉堡">
                            <ul class="cookList">
                                <li v-for="(list ,goodsId) in type0Goods " :key="goodsId" @click="addOrderList(list)">
                                    <span class="foodimg"><img :src="list.goodsImg" alt=""></span>
                                    <span class="foodName">{{list.goodsName}}</span>
                                    <span class="price">￥{{list.price}}元</span>
                                </li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="小食">
                            <ul class="cookList">
                                <li v-for="(list ,goodsId) in type1Goods " :key="goodsId" @click="addOrderList(list)">
                                    <span class="foodimg"><img :src="list.goodsImg" alt=""></span>
                                    <span class="foodName">{{list.goodsName}}</span>
                                    <span class="price">￥{{list.price}}元</span>
                                </li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="饮料">
                            <ul class="cookList">
                                <li v-for="(list ,goodsId) in type2Goods " :key="goodsId" @click="addOrderList(list)">
                                    <span class="foodimg"><img :src="list.goodsImg" alt=""></span>
                                    <span class="foodName">{{list.goodsName}}</span>
                                    <span class="price">￥{{list.price}}元</span>
                                </li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="套餐">
                            <ul class="cookList">
                                <li v-for="(list,goodsId) in type3Goods " :key="goodsId" @click="addOrderList(list)">
                                    <span class="foodimg"><img :src="list.goodsImg" alt=""></span>
                                    <span class="foodName">{{list.goodsName}}</span>
                                    <span class="price">￥{{list.price}}元</span>
                                </li>
                            </ul>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            tableData:[],
            oftenGoods:[],
            type0Goods:[],
            type1Goods:[],
            type2Goods:[],
            type3Goods:[],
            totalCount:'',
            totalMoney:''
        }
    },
    created(){
        axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods')
        .then((res) =>{
            console.log(res.data)
            this.oftenGoods=res.data 
        }),
        axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/typeGoods')
        .then((res) =>{
            this.type0Goods=res.data[0]
            console.log(this.type0Goods)
            this.type1Goods=res.data[1]
            this.type2Goods=res.data[2],
            this.type3Goods=res.data[3]
        })
    },
    mounted(){
        var orderheight = document.body.clientHeight;
        // console.log(orderheight)
        document.getElementById('pos-order').style.height=orderheight+'px'
    },
    methods:{
        addOrderList(list){
            this.totalCount=0; //汇总数量清0
            this.totalMoney=0;
            let isHave=false
            for(let i=0;i<this.tableData.length;i++){
                if(this.tableData[i].goodsId == list.goodsId){
                    isHave=true
                }
            }
            if(isHave){
                //商品存在时进行数量添加
                let arr=this.tableData.filter(o => o.goodsId == list.goodsId)
                arr[0].count++
            }else{
                //商品不存在时进行追加商品
                let newGoodds={goodsId:list.goodsId,goodsName:list.goodsName,price:list.price,count:1};
                this.tableData.push(newGoodds)
            }
            //进行价格的汇总计算
            this.tableData.forEach((e) =>{
                this.totalCount += e.count
                this.totalMoney += e.price*e.count
            })
        },
        //删除单个商品
        delGoods(list){
           this.tableData=this.tableData.filter(o => o.goodsId !=list.goodsId)
           this.getAllMoney()
        },
        //汇总的数量和金额
        getAllMoney(){
            this.totalCount=0
            this.totalMoney=0
            if(this.tableData){
               //进行价格的汇总计算
                this.tableData.forEach((e) =>{
                    this.totalCount += e.count
                    this.totalMoney += e.price*e.count
                })  
            }
        },
        //删除全部商品
        deleteAll(){
            this.tableData=[]
            this.totalCount=''
            this.totalMoney=''
        },
        //模拟结账功能
        invoicing(){
            if(this.totalCount!=0){
                this.tableData=[]
                this.totalCount=0
                this.totalMoney=0
                this.$message({
                    message: '结账成功，感谢你又为店里出了一份力!',
                    type: 'success'
                })
            }else{
                this.$message.error('结账失败，商品不能为空');
                
            }
        }
    }
}
</script>

<style scoped>
.pos-order{
    background-color:#FFFAF0;
    border-right:1px solid #fff;
    height:100%;
}
.divbtn{
    margin-top:10px;
}
.title{
    height:20px;
    border-bottom: 1px solid #d3dced;
    padding: 10px;
    text-align: left;
}
.goodsList ul li{
    float:left;
    border:1px solid #87CEEB;
    padding:10px;
    margin:10px;
    background: #fff;
}
.price{
    color:#1E90FF;
}
.goods-type{
    clear: both;
}
.cookList li{
    width:23%;
    border:1px solid #e5e9f2;
    height:auto;
    overflow: hidden;
    float:left;
    padding:2px;
    background-color:#fff;
}
.cookList li span{
    float: left;
    display: block;
}
.foodimg{
    width:40%;
}
.foodimg img{
    width:100%;
    height:100%;
}
.foodName{
    padding-top:10px;
    font-size: 16px;
    padding-left: 10px;
    color:bromn;
}
.price{
    font-size: 16px;
    padding: 10px;
}
.totalDiv{
    width:100%;
    padding:10px;
    border:1px solid #fff;
    background: #fff;
}
</style>
