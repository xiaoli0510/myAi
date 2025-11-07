<script setup lang='ts'>
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-vue-next';
import { reactive, ref } from 'vue';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { toast } from 'vue-sonner'
import { useRoute, useRouter } from 'vue-router';

const CardType = ref('login') // 面板类型

// 登录参数
const form = reactive({
    Account: 'admin@163.com', //邮箱
    Password: '123456', //密码
    UseJwt: true,
})

const isLoading = ref(false) // 受否正在发送验证码

// 登录
const router = useRouter()
const login = (email?: string, pwd?: string) => {
    console.log(3);
    const params = {
        ...form,
        Account: email,
        Password: pwd,
    }
    const emailRegex = /^[a-zA-Z0-9-]+@[a-zA-Z0-9-]+\.\w{2,6}$/
    if (!emailRegex.test(params.Account)) {
        return toast.error('请输入有效邮箱')
    }
    console.log(22222);

    if (params.Account === 'admin@163.com' && params.Password === '123456') {
        console.log(11111111111);
        router.replace('/');
    }

}

const countdownNum = ref(60) // 倒计时
// 注册
const registerForm = reactive({
    Username: '',
    ConfirmPassword: '',
    Email: '',
    Password: '',
})
// 注册跳转获取验证码
const registerGetVerifyCodeM = () => {
}

// 验证是否有账号
const VerifyEmailForm = reactive({
    Email: '',
    TypeId: '',
})

// 点击重置密码按钮，给邮箱发送验证码
const VerifyEmailM = () => {
}

</script>
<template>
    <div class="w-full max-w-[500px]">
        <!-- 1-登录 -->
        <div v-if="CardType === 'login'" class="w-full flex flex-col gap-8">
            <div class="flex flex-col items-center gap-4">
                <h1 class="text-2xl font-bold">Welcome</h1>
            </div>
            <div class="grid gap-8 mt-8">
                <div class="grid gap-2">
                    <Label for="email">Account</Label>
                    <Input class="w-full" maxlength="50" type="text" placeholder="Account" v-model="form.Account"
                        required />
                </div>
                <div class="grid gap-2">
                    <div class="flex justify-between items-center">
                        <Label>Password</Label>
                        <div class="text-center cursor-pointer text-xs hover:underline"
                            @click="CardType = 'VerifyEmail'">
                            Forgot you Password?
                        </div>
                    </div>
                    <Input class="w-full" type="password" autocomplete="new-password" maxlength="50"
                        v-model="form.Password" required />
                </div>
                <Button class="w-full mt-5" @click="login" :disabled="isLoading">
                    {{ isLoading ? 'Loading...' : 'Login111' }}
                </Button>
            </div>
            <div class="text-center text-sm">
                Don't have an account?
                <span class="underline cursor-pointer ml-1" @click="CardType = 'register'">Sign Up</span>
            </div>
        </div>

        <!-- 2-注册 -->
        <div v-if="CardType === 'register'" class="w-full flex flex-col gap-8">
            <div class="flex flex-col items-center gap-4">
                <h1 class="text-2xl font-bold">Create an account</h1>
                <p class="text-balance text-sm text-muted-foreground">
                    Already Have An Account?
                    <span class="cursor-pointer underline text-primary" @click="CardType = 'login'">Login</span>
                </p>
            </div>

            <div class="grid gap-6">
                <div class="grid gap-2">
                    <Label>Nickname</Label>
                    <Input class="w-full" maxlength="30" type="text" placeholder="Nickname no special characters"
                        v-model="registerForm.Username" required />
                </div>
                <div class="grid gap-2">
                    <Label>Email</Label>
                    <Input class="w-full" type="text" maxlength="50" v-model="registerForm.Email" required />
                </div>

                <div class="grid gap-2">
                    <Label>Password</Label>
                    <Input class="w-full" type="password" maxlength="20" placeholder="Password at least 6 characters"
                        v-model="registerForm.Password" required />
                </div>

                <div class="grid gap-2">
                    <Label>Confirm Password</Label>
                    <Input class="w-full" type="password" maxlength="20" placeholder="Confirm Password"
                        v-model="registerForm.ConfirmPassword" required />
                </div>
                <div>
                    <Button v-if="isLoading" class="w-full mt-2" disabled> loading... </Button>
                    <Button v-else class="w-full mt-2" @click="registerGetVerifyCodeM" :disabled="countdownNum != 60">
                        {{ countdownNum != 60 ? countdownNum + 's' : 'Sign Up' }}
                    </Button>
                </div>
            </div>
            <div class="text-center text-xs text-muted-foreground">
                By clicking “Sign up" you agree to our
                <a href="#" target="_blank" class="text-blue-500">Terms of Service</a>
                and acknowledge that you have read and understand our
                <a href="#" target="_blank" class="text-blue-500">Privacy Policy</a>.
            </div>
        </div>

        <!-- 4-重置密码验证邮箱 -->
        <Card v-if="CardType === 'VerifyEmail'"
            class="w-full w-[450px] lg:border-0 min-w-80 text-center h-3/4 flex flex-col justify-center">
            <CardHeader>
                <CardTitle class="text-2xl">Password recovery</CardTitle>
                <br />
                <CardDescription class="mt-5">Please enter your email and we'll send you a password recovery code
                </CardDescription>
            </CardHeader>
            <CardContent class="grid gap-4">
                <div class="grid gap-2 mt-2">
                    <Input class="w-full" type="text" maxlength="50" placeholder="Email" v-model="VerifyEmailForm.Email"
                        required />
                </div>
                <Button class="w-full mt-2" @click="VerifyEmailM" :disabled="isLoading">
                    {{ isLoading ? 'Loading...' : 'Reset password' }}
                </Button>
            </CardContent>
            <CardFooter class="mt-2">
                <ArrowLeft class="cursor-pointer" @click="CardType = 'login'" />
            </CardFooter>
        </Card>
    </div>
</template>