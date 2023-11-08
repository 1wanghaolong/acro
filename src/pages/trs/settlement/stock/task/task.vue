<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div class="steps" :style='local.lang =="en"?"width: 950px;":""'>
                <a-steps :current="current">
                    <a-step>
                        {{$t('task.task.5umxe2hmj7k0')}}
                    </a-step>
                    <a-step>
                        <template v-if="form.data.is_cancel &&  form.data.status < 2" #icon>
                            <icon-close />
                        </template>
                        {{$t('task.task.5umxe2hmjqw0')}}
                    </a-step>
                    <a-step>
                        <template v-if="form.data.is_cancel &&  form.data.status < 3" #icon>
                            <icon-close />
                        </template>
                        {{$t('task.task.5umxe2hmjvo0')}}
                    </a-step>
                    <a-step>
                        <template v-if="form.data.is_cancel &&  form.data.status < 4" #icon>
                            <icon-close />
                        </template>
                        {{$t('task.task.5umxe2hmjz00')}}
                    </a-step>
                    <a-step>{{$t('task.task.5umxe2hmk100')}}</a-step>
                </a-steps>
            </div>
            <div style="flex: 1;overflow: auto;display: flex;align-items: center;justify-content: center;">
                <a-card style="width: 100%;height: 100%;" :loading="form.loading" :bordered="false">
                    <create @refresh="getData" :detail="form.detail" v-model:current="current" v-if="current == 1 && refresh"/>
                    <register @refresh="getData" :detail="form.detail" v-model:current="current" v-if="current == 2 && refresh"/>
                    <confirm @refresh="getData" :detail="form.detail" v-model:current="current" v-if="current == 3 && refresh"/>
                    <pursue @refresh="getData" :detail="form.detail" v-model:current="current" v-if="current == 4 && refresh"/>
                    <finish @refresh="getData" :detail="form.detail" v-model:current="current" v-show="current == 5 && refresh"/>
                </a-card>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import create from './create.vue'
import register from './register.vue'
import confirm from './confirm.vue'
import pursue from './pursue.vue'
import finish from './finish.vue'
const route = useRoute()
const router = useRouter()
const local = useLocal()
const current = ref(1)
const refresh = ref(true)
const form = reactive({
    show: false,
    loading: false,
    detail:{},
    data: {
        market:'',
        security_type:'',
        symbol:'',
        currency:'',
        record_date:'',
        record_type:1,
        volume:0,
        amount:0,
        status:1,
        is_cancel:0
    }
})

const getData = async (id?:any) => {
    form.loading = true
    const { code, data } = await apiTrs.trsSymbolSplitDetail({
        id: id || route.query?.id
    })
    form.loading = false
    if (code != 1) return;
    if(!data?.id) return;
    let obj:any = {}
    for (let key in form.data){
        if(key == 'record_date'){
            obj[key] = dayjs(data[key]).format('YYYY-MM-DD')
            continue;
        }
        if(key == 'amount'){
            obj[key] = Number(data[key])
            continue;
        }
        obj[key] = data[key]
    }
    form.data = obj
    form.detail = data
    if(data.is_cancel || data.status == 5){
        current.value = 5
    }else{
        current.value = data.status+1
    }
    // 让子组件重新载入数据
    refresh.value = false
    nextTick(()=>{
        refresh.value = true
    })
}
{
    route.query?.id && getData()
}
</script>
<style lang="less" scoped>
.steps {
    width: 800px;
    margin: 20px auto;
}
</style>