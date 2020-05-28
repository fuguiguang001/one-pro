<template>
  <div class="login">
      <div class="login_box">
            <el-form ref="login" :rules="rules" :model="loginFrom">
                <img src="./logo_index.png" alt="">
                <el-form-item prop="phone">
                    <el-input v-model="loginFrom.phone" placeholder="请输入手机号" maxlength='11'>
                        <i slot="prefix" class="iconfont icon-shoujihao"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginFrom.code" placeholder="请输入验证码">
                        <i slot="prefix" class="iconfont icon-yanzhengma"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="isok">
                    <el-checkbox v-model="loginFrom.isok" ></el-checkbox><span style="margin-left: 10px;">我已阅读并同意相关隐私条款</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="login_bool" :disabled="login_bool" @click="loginFn" style="width: 100%">登录</el-button>
                </el-form-item>
            </el-form>
      </div>
  </div>
</template>

<script>
// 引入第三方验证弹框插件
import '@/assets/js/gt.js'

// 引入阿里巴巴矢量图标
import '@/assets/iconfont/iconfont.css'

export default {
    data(){
        // 自定义效验方法(注意在return 同级书写)
        var xiyiFn = function(rule,value,callback){  //当前项目验证规则 当前项目值 回调函数
            // if(value){
            //     callback()
            // }else{
            //     callback(new Error('请您无条件遵守我们的规则'))
            // }

            // 三目运算符
            value ? callback() : callback(new Error('请您无条件遵守我们的规则'))
        }
        return {
            login_bool: false,
            catObj: null, //用于进行验证弹框缓存
            loginFrom: {
                phone: '13911112222',
                code: '246810',
                isok: true
            },
            rules: {
                phone: [
                    {required: true, message: '请输入手机号', trigger: 'blur'},
                    {pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号', trigger: 'blur'}
                ],
                code: [
                    {
                        required: true, message: '请输入验证码', trigger: 'blur'
                    }
                ],
                isok: [
                    {validator: xiyiFn}
                ]
            }
        }
    },
    methods: {
        // 登录函数
        loginFn(){
            this.$refs.login.validate((res)=>{
                if(res){
                    //判断验证弹框是否存在缓存
                    if(this.catObj != null){
                        return this.catObj.verify();
                    }
                    //登录按钮进行等待状态
                    this.login_bool = true;
                    //进行人机验证
                    let pro = this.$http.get(`/captchas/${this.loginFrom.phone}`)
                    pro
                        .then((result)=>{
                            let {data} = result.data  //进行对象解构赋值
                            window.initGeetest({
                                // 以下配置参数来自服务端 SDK
                                gt: data.gt,
                                challenge: data.challenge,
                                offline: !data.success,
                                new_captcha: true,
                                product: 'bind'
                            }, (captchaObj) =>{
                                // 这里可以调用验证实例 captchaObj 的实例方法
                                captchaObj.onReady(() =>{
                                    //显示验证码
                                    this.login_bool = false;
                                    captchaObj.verify();
                                    this.catObj = captchaObj;
                                }).onSuccess(() =>{
                                    //验证成功
                                    this.loginAct();
                                }).onError(() =>{
                                    //验证失败
                                })
                            })
                        })
                        .catch((err)=>{
                            this.$message.error('失败');
                        })

                }
            });
        },
        // 进行账号真实性验证
        loginAct(){
            let pro = this.$http.post('/authorizations',{
                        mobile: this.loginFrom.phone,
                        code: this.loginFrom.code
                    })
                    pro
                        .then(result =>{
                            console.log(result.data.data)
                            // 将用户登录信息存储在浏览器中
                            window.sessionStorage.setItem('userInfo', JSON.stringify(result.data.data))
                            this.$router.push('/home')
                        })
                        .catch(err =>{
                            this.$message.error('登录失败');
                        })
        }
    },
}
</script>

<style lang="less" scoped>
.login{
    // 弹性布局
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url(./login_bg.jpg);
    background-size: 100%;
    .login_box{
        width: 400px;
        height: 340px;
        background-color: #fff;
        border-radius: 6px;

        display: flex;
        justify-content: center;
        align-items: center;
        .el-form{
            width: 75%;
        }
        img{
            width: 50%;
            display: block;
            margin: 20px auto;
        }
    }
}
</style>
