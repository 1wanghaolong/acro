<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-card :loading="loading">
                <template #title>
                    <div style="display: flex;justify-content: space-between;">
                        <a-space :size="18">
                            {{$t('risk.detail.5um7rb0p9c80')}}
                        </a-space>
                        <a-space :size="18" v-permission="['otcRiskAudit']">
                            <a-button v-if="form.data?.status == 1" @click="audit.show = true;audit.data.status = 2" type="primary" :loading="form.loading" :disabled="form.loading">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('risk.detail.5um7rb0p9y00')}}
                            </a-button>
                            <a-button v-if="form.data?.status == 1" @click="audit.show = true;audit.data.status = 3" type="primary" status="danger">
                                <template #icon>
                                    <icon-close />
                                </template>
                                {{$t('risk.detail.5um7rb0pa3o0')}}
                            </a-button>
                        </a-space>
                    </div>
                </template>
                <a-form ref="formRef" :model="form.data" auto-label-width layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('risk.detail.5um7rb0pa5w0')">
                                {{ form.data?.asset_account_info?.account }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('risk.detail.5um7rb0pa7w0')">
                                <div>{{ form.data?.asset_account_info?.real_name }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('risk.detail.5um7rb0paak0')">
                                <div>{{ form.data?.asset_account_info?.english_name }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('risk.detail.5um7rb0pacw0')">
                                <a-tag>
                                    {{ useEnumsFormat('otc.risk.from_type', form.data?.from_type) }}
                                </a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('risk.detail.5um7rb0paes0')">
                                <a-tag size="small" :color="form.data?.status == 2?'#00b42a':form.data?.status == 1?'#ff7d00':'#f53f3f'">
                                    {{ useEnumsFormat('otc.risk.status', form.data?.status) }}
                                </a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('risk.detail.5um7rb0pagw0')">
                                {{ dayjs.unix(form.data.create_time).format('YYYY-MM-DD HH:mm:ss') }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data.status != 1">
                            <a-form-item :label="$t('risk.detail.5um7rb0paj00')">
                                {{ form.data.audit_time?dayjs.unix(form.data.audit_time).format('YYYY-MM-DD HH:mm:ss'):'-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('risk.detail.5um7rb0pakw0')">
                                {{ useEnumsFormat('otc.risk.risk_level', form.data?.risk_level) }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.score">
                            <a-form-item :label="$t('risk.detail.5um7rb0pams0')">
                                {{ form.data?.score }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['zh-CN']">
                            <a-form-item :label="$t('risk.detail.5um7rb0paos0')">
                                {{ form.data?.reasons?.['zh-CN'] || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['en']">
                            <a-form-item :label="$t('risk.detail.5um7rb0paqo0')">
                                {{ form.data?.reasons?.['en'] || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['tc']">
                            <a-form-item :label="$t('risk.detail.5um7rb0pats0')">
                                {{ form.data?.reasons?.['tc'] || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.questionnaire_url">
                            <a-form-item :label="$t('risk.detail.5um7rb0pavw0')">
                                <a-button type="primary" target="_blank"
                                    :href="form.data?.questionnaire_url">{{$t('risk.detail.5um7rb0paxs0')}}</a-button>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-card>
            <a-card  v-permission="['otcRiskQuestion']" style="margin-top: 20px;" v-for="(item,index) in form.questionnaireAnswer">
                <template #title>
                    <div style="display: flex;justify-content: space-between;">
                        <a-space :size="18" style="color:var(--color-text-2);font-size: 14px;">
                            {{ item?.config?.title[local.lang] }}
                        </a-space>
                        <a-space :size="18">
                            <a-tag color="arcoblue">{{$t('risk.detail.5um7rto8ihg0')}}:{{ computedScore(item.problem_list,index) }}</a-tag>
                        </a-space>
                    </div>
                </template>
                <a-card v-for="subItem in item.problem_list" style="margin-top: 5px;">
                        <a-row :gutter="16" style="margin-bottom: 10px;">
                            <a-col :sm="12" >
                                {{ subItem.text[local.lang] }}
                            </a-col>
                            <a-col :sm="12" style="text-align: right;">
                                <a-tag v-if="subItem.config.options.find((i:any)=>i.key == subItem.config.selected)?.extra?.score && index == 0">{{$t('risk.detail.5um7shzjay80')}}:{{ subItem.config.options.find((i:any)=>i.key == subItem.config.selected)?.extra?.score }}</a-tag>
                            </a-col>
                        </a-row>
                        <a-radio-group disabled :default-value="subItem.config.selected">
                            <a-radio v-for="option in subItem.config.options" :value="option.key">{{ option.text[local.lang] }}</a-radio>
                        </a-radio-group>
                        <!-- 客户投资知识及经验 -->
                        <a-card v-if="subItem.key == 'know_structural_product' && subItem?.config?.selected == '1'" v-for="subSmallItem in subItem?.config?.options[0].config.sub_problem" style="margin-top: 10px;">
                            <a-row :gutter="16" style="margin-bottom: 10px;">
                                <a-col :sm="12" >
                                    {{ subSmallItem.text[local.lang] }}
                                </a-col>
                                <a-col :sm="12" style="text-align: right;"></a-col>
                            </a-row>
                            <div v-if="subSmallItem.type == 'checkbox'" v-for="option in subSmallItem.config.options?.filter((i:any)=>subSmallItem.config.selected.includes(i.key))">
                                <a-card>
                                    <div>{{ option.text[local.lang] }}</div>
                                    <div style="margin-top: 10px;" v-if="option?.type == 'type'">
                                        {{ option?.config?.options?.find((a:any)=>a.key == option?.config?.selected)?.text[local.lang] }}
                                    </div>
                                    <div style="margin-top: 10px;" v-if="option?.type == 'text'">
                                        <div v-for="subOption in option?.config?.sub_problem">
                                            <p style="margin-top: 5px;">{{ subOption.text[local.lang] }}: {{ subOption.config.value }}</p>
                                        </div>
                                    </div>
                                    <div style="margin-top: 10px;" v-if="option?.type == 'textarea'">
                                        {{ option?.config.value }}
                                    </div>
                                </a-card>
                            </div>
                            <div v-if="subSmallItem.type == 'upload'">
                                <a-image-preview-group infinite>
                                    <a-space wrap>
                                        <a-image v-for="option in subSmallItem.config.value" :src="option.url" width="200" />
                                    </a-space>
                                </a-image-preview-group>
                            </div>
                            
                        </a-card>
                </a-card>

            </a-card>
            </div>
        </a-card>
        <!-- 审核 -->
        <a-modal v-model:visible="audit.show" :title="audit.data.status == 2? $t('risk.detail.5um7rb0p9y00') : $t('risk.detail.5um7rb0pa3o0') " @cancel="audit.show = false" @before-ok="submit">
            <a-form ref="auditFormRef" :model="audit.data" auto-label-width>
                <!-- 审核通过 -->
                <template v-if="audit.data.status == 2">
                    {{$t('risk.detail.5um7rb0pb000')}}
                </template>
                <!-- 驳回 -->
                <template v-else>
                    <a-form-item field="reasons['zh-CN']" :label="$t('risk.detail.5um7rb0pb240')">
                        <a-input v-model="audit.data.reasons['zh-CN']" :placeholder="$t('risk.detail.5um7rb0pb400')" />
                    </a-form-item>
                    <a-form-item field="reasons['en']" :label="$t('risk.detail.5um7rb0pb7o0')">
                        <a-input v-model="audit.data.reasons['en']" :placeholder="$t('risk.detail.5um7rb0pb9g0')"  />
                    </a-form-item>
                    <a-form-item field="reasons['tc']" :label="$t('risk.detail.5um7rb0pbbg0')">
                        <a-input v-model="audit.data.reasons['tc']" :placeholder="$t('risk.detail.5um7rb0pbcw0')"  />
                    </a-form-item>
                </template>
            </a-form>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
import { useQuestionnaireAnswerGroup } from '@/hooks/tree'
import dayjs from 'dayjs'
const local = useLocal()
const route = useRoute()
const { t } = useI18n();
const router = useRouter()
const formRef = ref()
const auditFormRef = ref()
const loading = ref(false)
const form: any = reactive({
    show: false,
    loading: false,
    setup: false,
    questionnaireAnswer: [],
    data: {},
    rules: {
        real_name: [{ required: true, message: t('risk.detail.5um7rb0pbeg0') }],
        english_name: [{ required: true, message: t('risk.detail.5um7rb0pbgg0') }],
        email: [{ required: true, message: t('risk.detail.5um7rb0pbi00') }, { type: 'email', message: t('risk.detail.5um7rb0pbjg0') }]
    }
})
const audit = reactive({
    loading: false,
    show: false,
    data: {
        status: 2,
        is_auto_calculate_fee: 1,
        fee: 0,
        to_amount: 0,
        reasons: {
            'zh-CN': '',
            en: '',
            tc: ''
        }
    }
})
const computedScore = (list:any,index:number) => {
    let score = 0
    list?.forEach((item:any)=>{
        if(item?.config?.options?.find((i:any)=>i.key == item?.config?.selected)?.extra?.score){
            score += Number(item?.config?.options?.find((i:any)=>i.key == item?.config?.selected)?.extra?.score)
        }
    })
    if(index != 0){
        score = Math.floor(score*0.2)>20?20:Math.floor(score*0.2)
    }
    return score
}
const submit = async () => {
    const validate = await auditFormRef.value?.validate()
    if (validate) return false;
    audit.loading = true
    const { code, msg } = await apiOtc.riskAssessmenUpdate({
        id: form.data.id,
        data: {
            operator_id: local.userInfo?.id || 1,
            ...audit.data
        }
    })
    audit.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    getData()
}
const getData = async () => {
    loading.value = true
    const { code, data } = await apiOtc.riskAssessmenInfo({
        id: route.params?.id
    })
    loading.value = false
    if (code != 1) return;
    form.data = data
    data?.answer_id && usePermission(['otcRiskQuestion']) && getQuestionnaireAnswer(data.answer_id)
}
const getQuestionnaireAnswer = async (answer_id: any) => {
    const { code, data } = await apiSystem.questionnaireAnswer({
        answer_id
    })
    if (code != 1) return;
    form.questionnaireAnswer = useQuestionnaireAnswerGroup(data)
}

{
    getData()
}

</script>

<style lang="less" scoped>
:deep(.arco-form-item-label-col > .arco-form-item-label) {
    color: var(--color-text-3);
}
:deep(.arco-radio-disabled .arco-radio-label),:deep(.arco-checkbox-disabled .arco-checkbox-label) {
    color: var(--color-text-1) !important;
}
:deep(.arco-radio-checked.arco-radio-disabled .arco-radio-icon, .arco-radio-checked.arco-radio-disabled:hover .arco-radio-icon),
:deep(.arco-checkbox-disabled.arco-checkbox-checked .arco-checkbox-icon, .arco-checkbox-disabled.arco-checkbox-checked:hover .arco-checkbox-icon){
    background-color: rgb(var(--primary-6));
    border-color: rgb(var(--primary-6));
}
</style>