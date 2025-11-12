<script setup lang='ts'>
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { reactive, ref } from 'vue';
import { useToast } from "@/components/ui/toast/use-toast"
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { apiRegister } from '@/apis/user';

const { toast } = useToast()
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
const userStore = useUserStore();
const login = (email?: string, pwd?: string) => {
    const params = {
        ...form,
        Account: email,
        Password: pwd,
    }
    const emailRegex = /^(?:[\w+-]+)@(?:[\w+-]+)\.(?:\w{2,})/
    if (!emailRegex.test(params.Account)) {
        return toast({
            description: '请输入有效邮箱',
        });
    }

    userStore.login(params).then(() => {
        router.push('/')
    })
}

// 注册
const registerForm = reactive({
    Username: 'admin',
    ConfirmPassword: '123456',
    Email: 'admin@163.com',
    Password: '123456',
})
// 注册
const register = () => {
    apiRegister(registerForm).then(res => {
        CardType.value = 'login'
        //注册成功后跳转到登录页面
    })
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
                    </div>
                    <Input class="w-full" type="password" autocomplete="new-password" maxlength="50"
                        v-model="form.Password" required />
                </div>
                <Button class="w-full mt-5" @click="login(form.Account, form.Password)" :disabled="isLoading">
                    {{ isLoading ? 'Loading...' : 'Login' }}
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
                    <Button v-else class="w-full mt-2" @click="register">
                        Sign Up
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
    </div>
</template>