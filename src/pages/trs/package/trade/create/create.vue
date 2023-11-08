<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div class="steps">
                <a-steps :current="current">
                    <a-step>{{$t('create.create.5um5fobmaos0')}}</a-step>
                    <a-step>{{$t('create.create.5umyjdmr5gk0')}}</a-step>
                    <a-step>{{$t('create.create.5umyjdmr6iw0')}}</a-step>
                    <a-step>{{$t('create.create.5um8eulhgh00')}}</a-step>
                </a-steps>
            </div>
            <div v-if="current == 1">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
                    <a-form-item field="nameZh" :label="$t('create.create.5um5fobmjfw0')">
                        <a-input v-model="form.data.nameZh" :placeholder="$t('create.create.5um5fobmjic0')" />
                    </a-form-item>
                    <a-form-item field="nameEn" :label="$t('create.create.5um5fobmjks0')">
                        <a-input v-model="form.data.nameEn" :placeholder="$t('create.create.5um5fobmjnk0')" />
                    </a-form-item>
                    <a-form-item field="nameTc" :label="$t('create.create.5um5fobmjqk0')">
                        <a-input v-model="form.data.nameTc" :placeholder="$t('create.create.5um5fobmjt40')" />
                    </a-form-item>
                    <a-form-item field="descZh" :label="$t('create.create.5um5fobmjvk0')">
                        <a-textarea style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }" v-model="form.data.descZh"
                            :placeholder="$t('create.create.5um5fobmjy00')" />
                    </a-form-item>
                    <a-form-item field="descEn" :label="$t('create.create.5um5fobmk0g0')">
                        <a-textarea style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }" v-model="form.data.descEn"
                            :placeholder="$t('create.create.5um5fobmk2w0')" />
                    </a-form-item>
                    <a-form-item field="descTc" :label="$t('create.create.5um5fobmk5g0')">
                        <a-textarea style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }" v-model="form.data.descTc"
                            :placeholder="$t('create.create.5um5fobmk7k0')" />
                    </a-form-item>

                    <a-form-item>
                        <div style="display: flex;justify-content: flex-end;width: 100%;">
                            <a-space :size="18">
                                <a-button @click="resetField(1)">{{$t('create.create.5um8eulhi9c0')}}</a-button>
                                <a-button type="primary" html-type="submit">
                                    {{$t('create.create.5um8eulhif80')}}
                                </a-button>
                            </a-space>
                        </div>
                    </a-form-item>
                </a-form>
            </div>
            <div v-if="current == 2">
                <a-card style="margin-top: 20px;">
                    <template #title>
                        <div style="display: flex;justify-content: space-between;">
                            <a-space :size="18">
                                <a-button type="primary" @click="addVisibleBtn(1)">
                                    <template #icon>
                                        <icon-plus />
                                    </template>
                                    {{$t('create.create.5um5fobmkfc0')}}</a-button>
                            </a-space>
                        </div>
                    </template>
                    <a-table :bordered="false" column-resizable :pagination="false"
                        :scroll="charge.list?.filter((item: any) => (item.type == 1))?.length ? { x: '100%', y: '100%' } : undefined"
                        size="small" :data="charge.list?.filter((item: any) => (item.type == 1))" class="table">
                        <template #columns>
                            <a-table-column title="#" :width="50">
                                <template #cell="{ rowIndex }">
                                    {{ rowIndex + 1 }}
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5umyjdmr6po0')" :width="150">
                                <template #cell="{ record }">
                                    <a-tag style="margin-right:5px;margin-bottom: 5px;" v-for="item in record.market"
                                        color="#165dff">
                                        {{ useEnumsFormat('market.market', item) }}
                                    </a-tag>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5umyjdmr6t80')" :width="150">
                                <template #cell="{ record }">
                                    <a-tag style="margin-right:5px;margin-bottom: 5px;" v-for="item in record.security_type"
                                        color="#165dff">
                                        {{ useEnumsFormat('trs.package.trade.create.security_type', item) }}
                                    </a-tag>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5umyjdmr6x80')" :width="150">
                                <template #cell="{ record }">
                                    <div>{{ local.lang == 'tc' ? record.nameTc : local.lang == 'en' ? record.nameEn :
                                        record.nameZh }}
                                    </div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5umyjdmr7140')" :width="100">
                                <template #cell="{ record }">
                                    <a-tag color="#165dff">{{
                                        useEnumsFormat('trs.package.trade.create.direction', record.direction) }}</a-tag>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5um5fobmkk00')" :width="150" data-index="real_name">
                                <template #cell="{ record }">
                                    <div>{{ useEnumsFormat('trs.package.trade.create.calculate_type',
                                        record.calculate_type) }}</div>
                                    <div v-if="record.calculate_type == 1">{{ Number(record.calculate_value) }}% {{$t('create.create.5um5fobmknc0')}}</div>
                                    <div v-else-if="record.calculate_type == 2">{{ Number(record.calculate_value) }}{{'交易数量'}}
                                    </div>
                                    <div v-else>{{ Number(record.calculate_value) }}{{'每笔'}}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5um5fobmkpc0')" :width="150" data-index="real_name">
                                <template #cell="{ record }">
                                    <template v-if="record.calculate_type != 3">
                                        <div>{{'最高'}}:{{ Number(record.max) }}</div>
                                        <div>{{'最低'}}:{{ Number(record.min) }}</div>
                                    </template>
                                    <template v-else>
                                        -
                                    </template>

                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5um5fobmkrc0')" :width="100" data-index="real_name">
                                <template #cell="{ record }">
                                    <template v-if="record.calculate_type != 3">
                                        <div>{{ useEnumsFormat('trs.package.trade.create.round_type', record.round_type) }}
                                        </div>
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5um5fobmktk0')" :width="130" data-index="round_precision">
                                <template #cell="{ record }">
                                    <template v-if="record.calculate_type != 3">
                                        {{ record.round_precision }}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </template>
                            </a-table-column>
                            <!-- <a-table-column title="收费方" :width="150" >
                                <template #cell="{ record }">
                                       {{ dataList.find((item:any)=>item.id==record.charge_person_id).name }}
                                </template>
                            </a-table-column> -->
                            <a-table-column fixed="right" :title="$t('create.create.5um5fobmkvc0')" :width="100">
                                <template #cell="{ record }">
                                    <a-space>
                                        <a-button style="padding-left:0" type="text" @click="deleteBtn(record)"
                                            status="danger" size="small">
                                            {{ $t('create.create.5um5fobmkxw0') }}
                                        </a-button>
                                    </a-space>
                                </template>
                            </a-table-column>
                        </template>
                    </a-table>
                </a-card>
                <div style="display: flex;justify-content: flex-end;width: 100%;margin-top:15px">
                    <a-space :size="18">
                        <a-button type="primary" @click="current = 1">
                            {{$t('create.create.5um8eulhiq00')}}
                        </a-button>
                        <a-button type="primary" @click=" current = 3">
                            {{$t('create.create.5um8eulhif80')}}
                        </a-button>
                    </a-space>
                </div>
            </div>
            <div v-if="current == 3">
                <a-card style="margin-top: 20px;">
                    <template #title>
                        <div style="display: flex;justify-content: space-between;">
                            <a-space :size="18">
                                <a-button type="primary" @click="addVisibleBtn(2)">
                                    <template #icon>
                                        <icon-plus />
                                    </template>
                                    {{$t('create.create.5um5fobmkfc0')}}</a-button>
                            </a-space>
                        </div>
                    </template>
                    <a-table :bordered="false" column-resizable :pagination="false"
                        :scroll="charge.list?.filter((item: any) => (item.type == 2))?.length ? { x: '100%', y: '100%' } : undefined"
                        size="small" :data="charge.list?.filter((item: any) => (item.type == 2))" class="table">
                        <template #columns>
                            <a-table-column title="#" :width="50">
                                <template #cell="{ rowIndex }">
                                    {{ rowIndex + 1 }}
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5umyjdmr6po0')" :width="150">
                                <template #cell="{ record }">
                                    <a-tag style="margin-right:5px;margin-bottom: 5px;" v-for="item in record.market"
                                        color="#165dff">
                                        {{ useEnumsFormat('market.market', item) }}
                                    </a-tag>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5umyjdmr6t80')" :width="150">
                                <template #cell="{ record }">
                                    <a-tag style="margin-right:5px;margin-bottom: 5px;" v-for="item in record.security_type"
                                        color="#165dff">
                                        {{ useEnumsFormat('trs.package.trade.create.security_type', item) }}
                                    </a-tag>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5umyjdmr6x80')" :width="150">
                                <template #cell="{ record }">
                                    <div>{{ local.lang == 'tc' ? record.nameTc : local.lang == 'en' ? record.nameEn :
                                        record.nameZh }}
                                    </div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5umyjdmr7140')" :width="100">
                                <template #cell="{ record }">
                                    <a-tag color="#165dff">{{
                                        useEnumsFormat('trs.package.trade.create.direction', record.direction) }}</a-tag>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5um5fobmkk00')" :width="150" data-index="real_name">
                                <template #cell="{ record }">
                                    <div>{{ useEnumsFormat('trs.package.trade.create.calculate_type',
                                        record.calculate_type) }}</div>
                                    <div v-if="record.calculate_type == 1">{{ Number(record.calculate_value) }}% {{$t('create.create.5um5fobmknc0')}}</div>
                                    <div v-else-if="record.calculate_type == 2">{{ Number(record.calculate_value) }}{{'交易数量'}}
                                    </div>
                                    <div v-else>{{ Number(record.calculate_value) }}{{'每笔'}}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5um5fobmkpc0')" :width="150" data-index="real_name">
                                <template #cell="{ record }">
                                    <template v-if="record.calculate_type != 3">
                                        <div>{{'最高'}}:{{ Number(record.max) }}</div>
                                        <div>{{'最低'}}:{{ Number(record.min) }}</div>
                                    </template>
                                    <template v-else>
                                        -
                                    </template>

                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5um5fobmkrc0')" :width="100" data-index="real_name">
                                <template #cell="{ record }">
                                    <template v-if="record.calculate_type != 3">
                                        <div>{{ useEnumsFormat('trs.package.trade.create.round_type', record.round_type) }}
                                        </div>
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5um5fobmktk0')" :width="130" data-index="round_precision">
                                <template #cell="{ record }">
                                    <template v-if="record.calculate_type != 3">
                                        {{ record.round_precision }}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5umyjdmr74k0')" :width="150">
                                <template #cell="{ record }">
                                    {{ dataList.find((item: any) => item.id == record.charge_person_id).name }}
                                </template>
                            </a-table-column>
                            <a-table-column fixed="right" :title="$t('create.create.5um5fobmkvc0')" :width="100">
                                <template #cell="{ record }">
                                    <a-space>
                                        <a-button style="padding-left: 0;" type="text" @click="deleteBtn(record)"
                                            status="danger" size="small">
                                            {{ $t('create.create.5um5fobmkxw0') }}
                                        </a-button>
                                    </a-space>
                                </template>
                            </a-table-column>
                        </template>
                    </a-table>
                </a-card>
                <div style="display: flex;justify-content: flex-end;width: 100%;margin-top:15px">
                    <a-space :size="18">
                        <a-button type="primary" @click=" current = 2">
                            {{$t('create.create.5um8eulhiq00')}}
                        </a-button>
                        <a-button type="primary" @click="savaBtn">
                            {{$t('create.create.5um8eulhiu00')}}
                        </a-button>
                    </a-space>
                </div>
            </div>
            <div v-if="current == 4" style="height: 100%;display: flex;align-items: center;">
                <div style="width: 600px;margin: auto;">
                    <a-result status="success">
                        <template #subtitle>
                            <p style="margin-bottom: 15px;">{{$t('create.create.5umyjdmr7840')}}</p>

                        </template>
                        <template #extra>
                            <a-space style="margin-top: 30px;">
                                <a-button @click="resetField">{{$t('create.create.5um5fobml500')}}</a-button>
                                <a-button type='primary' @click="router.back()">{{$t('create.create.5um8eulhj7g0')}}</a-button>
                                <!-- <a-button
                                    @click="router.replace({ name: 'trsPackageTradeDetail', params: { id: id } })">{{$t('create.create.5um8eulhjbk0')}}</a-button> -->
                            </a-space>
                        </template>
                    </a-result>
                </div>
            </div>

        </a-card>
        <a-modal width="600px" :mask-closable=false v-model:visible="addVisible" :on-before-ok="handleAdd"
            @close="onCloseAdd">
            <template #title>
                {{ $t('create.create.5um5fobmlac0') }}
            </template>
            <div style="display: flex;">
                <a-form ref="formRefs" :model="addForm" :rules="(form.ruleCreate as any)" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="market" :label="$t('create.create.5umyjdmr6po0')">
                                <a-select @change="optionBtn" scrollbar allow-clear multiple v-model="addForm.market"
                                    :placeholder="$t('create.create.5umyjdmr6po0')">
                                    <a-option v-for="item in useEnums('market.market')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="security_type" :label="$t('create.create.5umyjdmr6t80')">
                                <a-select allow-clear scrollbar multiple v-model="addForm.security_type" :placeholder="$t('create.create.5umyjdmr6t80')">
                                    <a-option v-for="item in securityType" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="nameZh" :label="$t('create.create.5umyjdmr7dc0')">
                                <a-input v-model="addForm.nameZh" :placeholder="$t('create.create.5umyjdmr7hw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="nameEn" :label="$t('create.create.5umyjdmr7m80')">
                                <a-input v-model="addForm.nameEn" :placeholder="$t('create.create.5umyjdmr7pk0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="nameTc" :label="$t('create.create.5umyjdmr7tc0')">
                                <a-input v-model="addForm.nameTc" :placeholder="$t('create.create.5umyjdmr7wk0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="type" :label="$t('create.create.5um5fobmkhk0')">
                                <a-select disabled allow-clear style="color:#000" readonly v-model="addForm.type"
                                    :placeholder="$t('create.create.5um8eulhhb00')">
                                    <a-option v-for="item in useEnums('trs.package.trade.create.type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" v-if="addForm.type == 2" :sm="12" :md="8" :xl="12">
                            <a-form-item v-if="addForm.type == 2" field="charge_person_id" :label="$t('create.create.5umyjdmr74k0')">
                                <a-select allow-clear v-model="addForm.charge_person_id" :placeholder="$t('create.create.5um8eulhhb00')">
                                    <a-option v-for="item in dataList" :value="item.id">{{
                                        item.name }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="direction" :label="$t('create.create.5umyjdmr7140')">
                                <a-select allow-clear v-model="addForm.direction" :placeholder="$t('create.create.5um8eulhhb00')">
                                    <a-option v-for="item in useEnums('trs.package.trade.create.direction')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="calculate_type" :label="$t('create.create.5um5fobmkk00')">
                                <a-select allow-clear v-model="addForm.calculate_type" :placeholder="$t('create.create.5um8eulhhb00')">
                                    <a-option v-for="item in useEnums('trs.package.trade.create.calculate_type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="calculate_value" :label="$t('create.create.5um5fobmldw0')">
                                <div style="width: 100%;">
                                    <a-input-number hide-button style="width: 100%;" v-model="addForm.calculate_value"
                                        :placeholder="$t('create.create.5um8eulhhjw0')">
                                        <template #append>{{ addForm.calculate_type != '1' ? '' : '%' }}</template>
                                    </a-input-number>
                                    <p style="margin-bottom: 0;margin-top:15px">{{$t('create.create.5um5fobmlhg0')}}</p>
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="addForm.calculate_type != '3'" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="min" :label="$t('create.create.5um5fobmlj00')">
                                <a-input-number hide-button style="width: 100%;" v-model="addForm.min" :placeholder="$t('create.create.5um8eulhhjw0')">
                                </a-input-number>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="addForm.calculate_type != '3'" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="max" :label="$t('create.create.5um5fobmll00')">
                                <a-input-number hide-button style="width: 100%;" v-model="addForm.max" :placeholder="$t('create.create.5um8eulhhjw0')">
                                </a-input-number>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="addForm.calculate_type != '3'" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="round_type" :label="$t('create.create.5um5fobmkrc0')">
                                <a-select allow-clear v-model="addForm.round_type" :placeholder="$t('create.create.5um8eulhhb00')">
                                    <a-option v-for="item in useEnums('trs.package.trade.create.round_type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="addForm.calculate_type != '3'" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="round_precision" :label="$t('create.create.5um5fobmlmo0')">
                                <a-input-number hide-button style="width: 100%;" v-model="addForm.round_precision"
                                    :placeholder="$t('create.create.5um8eulhhjw0')">
                                </a-input-number>
                            </a-form-item>
                        </a-col>
                    </a-row>

                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
const local = useLocal()
import { useEnumsFormat, useEnums } from '@/hooks/enums'
const formRef = ref()
const formRefs = ref()
const route = useRoute()
const router = useRouter()
const { t } = useI18n();
const current = ref(1)
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        nameZh: '',
        nameEn: '',
        nameTc: '',
        descZh: '',
        descEn: '',
        descTc: '',
    },
    rules: {
        nameZh: [{ required: true, message: t('create.create.5um5fobmjic0') }],
        nameEn: [{ required: true, message: t('create.create.5um5fobmjt40') }],
        nameTc: [{ required: true, message: t('create.create.5um5fobmjnk0') }],
        // descZh: [{ required: true, message: '请输入备注(中)' }],
        // descEn: [{ required: true, message: '请输入备注(英)' }],
        // descTc: [{ required: true, message: '请输入备注(繁)' }]
    },
    ruleCreate: {
        nameZh: [{ required: true, message: t('create.create.5umyjdmr7hw0') }],
        nameEn: [{ required: true, message: t('create.create.5umyjdmr7wk0') }],
        nameTc: [{ required: true, message: t('create.create.5umyjdmr7pk0') }],
        type: [{ required: true, message: t('create.create.5um5fobmlo80') }],
        market: [{ required: true, message: t('create.create.5umyjdmr7zk0') }],
        security_type: [{ required: true, message: t('create.create.5umyjdmr8380') }],
        charge_person_id: [{ required: true, message: t('create.create.5umyjdmr8680') }],
        direction: [{ required: true, message: t('create.create.5umyjdmr8a80') }],
        calculate_type: [{ required: true, message: t('create.create.5um5fobmlq00') }],
        round_type: [{ required: true, message: t('create.create.5um5fobmls00') }],
        round_precision: [{ required: true, message: t('create.create.5um5fobmlto0') }],
        calculate_value: [{ required: true, message: t('create.create.5um5fobmlvs0') }],
    }
})
const charge: any = reactive({
    list: [],
    loading: false,
    currency: useEnums('currency')?.[0].value
})
let addForm: any = ref({
    nameZh: '',
    nameEn: '',
    nameTc: '',
    type: 1,
    market: [],
    security_type: [],
    charge_person_id: '',
    direction: '',
    calculate_type: '',
    calculate_value: 0,
    max: 0,
    min: 0,
    round_type: '',
    round_precision: 0,
    id: 0
})
const addVisible = ref(false)
const addVisibleBtn = (num: any) => {
    addForm.value.type = num
    addVisible.value = true
}
const handleAdd = async () => {
    const validate = await formRefs.value?.validate()
    if (validate) return false;
    if (addForm.value.calculate_type != '3') {
        if (addForm.value.max != 0 || addForm.value.min != 0) {
            if (addForm.value.max < addForm.value.min) {
                formRefs.value.setFields({
                    max: {
                        status: 'error',
                        message: t('create.create.5um5fobmlxc0')
                    }
                })
                return false
            }
        }

    }
    addForm.value.id = Math.random()
    let bool = addForm.value.market.some((item: any) => item == 'ALL')
    if (bool) {
        addForm.value.market = ['ALL']
    } else {
        addForm.value.market = addForm.value.market
    }
    let bool1 = addForm.value.security_type.some((item: any) => item == 'ALL')
    if (bool1) {
        addForm.value.security_type = ['ALL']
    } else {
        addForm.value.security_type = addForm.value.security_type
    }

    // return false
    charge.list.push({ ...addForm.value })

}
const onCloseAdd = () => {
    addForm.value = {
        nameZh: '',
        nameEn: '',
        nameTc: '',
        type: 1,
        market: [],
        security_type: [],
        charge_person_id: '',
        direction: '',
        calculate_type: '',
        calculate_value: 0,
        max: 0,
        min: 0,
        round_type: '',
        round_precision: 0,
        id: 0
    }
    formRefs.value.resetFields()
}
const deleteBtn = async (val: any) => {
    let index = charge.list.findIndex((item: any) => item.id == val.id)
    charge.list.splice(index, 1)
}
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    current.value = 2
}
const id = ref()
const savaBtn = async () => {
    let list = [...charge.list]
    list.forEach((item: any) => {
        item.name = {
            'zh-CN': item.nameZh,
            'en': item.nameEn,
            'tc': item.nameTc,
        }
        item.market = item.market.join(',')
        item.security_type = item.security_type.join(',')
    })
    const { code, data } = await apiTrs.chargePackageCreate(
        {
            data: {
                name: {
                    'zh-CN': form.data.nameZh,
                    'en': form.data.nameEn,
                    'tc': form.data.nameTc,
                },
                desc: {
                    'zh-CN': form.data.descZh,
                    'en': form.data.descEn,
                    'tc': form.data.descTc,
                },
                status: 1,
                charge_list: list
            }
        }
    )
    if (code != 1) return;
    id.value = data.charge_package_id
    current.value = 4

}
const resetField = (num?: any) => {
    Object.keys(form.data).forEach((item: any) => {
        form.data[item] = ''
    })
    form.data = {
        nameZh: '',
        nameEn: '',
        nameTc: '',
        descZh: '',
        descEn: '',
        descTc: '',
    }
    charge.list = []
    if (num == 1) {
        formRef.value.resetFields()
    }
    formRefs.value.resetFields()
    current.value = 1

}
// 券商收费项
const securityType: any = ref([])
const optionBtn = () => {
    let type = useEnums('trs.package.trade.create.security_type')
    securityType.value = []
    addForm.value.security_type = []
    if (addForm.value.market?.length) {
        addForm.value.market.forEach((item: any) => {
            if (item == 'ALL') {
                let arr = ['ALL', 1, 11, 12, 13, 14, 41]
                arr.forEach((num: any) => {
                    securityType.value.push(type.find((items: any) => items.value == num))
                })
            }
            if (item == 'HKEX') {
                let arr = ['ALL', 1, 11, 12, 13, 14]
                arr.forEach((num: any) => {
                    securityType.value.push(type.find((items: any) => items.value == num))
                })
            }
            if (item == 'US') {
                let arr = ['ALL', 1, 41]
                arr.forEach((num: any) => {
                    securityType.value.push(type.find((items: any) => items.value == num))
                })
            }
            if (item == 'SSE' || item == 'SZSE') {
                let arr = ['ALL', 1]
                arr.forEach((num: any) => {
                    securityType.value.push(type.find((items: any) => items.value == num))
                })
            }
        })
    }
    let arr = []
    arr = securityType.value.reduce((acc: any, obj: any) => {
        const stringified = JSON.stringify(obj);
        if (!acc.includes(stringified)) {
            acc.push(stringified);
        }
        return acc;
    }, []).map(JSON.parse);
    securityType.value = [...arr]
}

// 收费方
const dataList = ref()
const getDataList = async () => {
    const { code, data } = await apiTrs.accountChargePersonAll({
        ...useFilter({ status: 1 })
    })
    if (code != 1) return;
    dataList.value = data
}
getDataList()
</script>
<style lang="less" scoped>
.steps {
    width: 800px;
    margin: 20px auto 20px;
}
</style>