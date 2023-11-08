<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-card :loading="loading">
                <template #title>
                    <div style="display: flex;justify-content: space-between;">
                        <a-space :size="18">
                            {{$t('trade.detail.5umygtiq5c80')}}
                        </a-space>
                        <a-space :size="18">
                            <a-button v-if="dataAll.setup" @click="dataAll.setup = false; getData()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('trade.detail.5umygtiq5zk0')}}
                            </a-button>
                            <a-button v-if="dataAll.setup" @click="submit" type="primary" :loading="dataAll.loading"
                                :disabled="dataAll.loading">
                                <template #icon>
                                    <icon-save />
                                </template>
                                {{$t('trade.detail.5umygtiq66k0')}}
                            </a-button>
                            <a-button v-permission="['trsChargePackageUpdate']" v-if="!dataAll.setup"
                                @click="dataAll.setup = true" type="primary">
                                <template #icon>
                                    <icon-edit />
                                </template>
                                {{$t('trade.detail.5umygtiq6bs0')}}
                            </a-button>
                        </a-space>
                    </div>
                </template>
                <a-form ref="formRef" :model="dataAll.data" :rules="dataAll.setup ? (dataAll.rules as any) : {}"
                    auto-label-width layout="vertical" @submit="submit">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item field="nameZh" :label="$t('trade.detail.5umygtiq6go0')">
                                <a-input v-if="dataAll.setup" v-model="dataAll.data.nameZh" :placeholder="$t('trade.detail.5umygtiq6lo0')" />
                                <div v-else>{{ dataAll.data.nameZh }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item field="nameEn" :label="$t('trade.detail.5umygtiq6q80')">
                                <a-input v-if="dataAll.setup" v-model="dataAll.data.nameEn" :placeholder="$t('trade.detail.5umygtiq6uw0')" />
                                <div v-else>{{ dataAll.data.nameEn }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item field="nameTc" :label="$t('trade.detail.5umygtiq6zw0')">
                                <a-input v-if="dataAll.setup" v-model="dataAll.data.nameTc" :placeholder="$t('trade.detail.5umygtiq74o0')" />
                                <div v-else>{{ dataAll.data.nameTc }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item  :label="$t('trade.detail.5umygtiq7aw0')">
                                <a-textarea v-if="dataAll.setup" style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }"
                                    v-model="dataAll.data.descZh" :placeholder="$t('trade.detail.5umygtiq7fk0')" />
                                <div v-else>{{ dataAll.data.descZh }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item :label="$t('trade.detail.5umygtiq7k80')">
                                <a-textarea v-if="dataAll.setup" style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }"
                                    v-model="dataAll.data.descEn" :placeholder="$t('trade.detail.5umygtiq7oo0')" />
                                <div v-else>{{ dataAll.data.descEn }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item :label="$t('trade.detail.5umygtiq7tc0')">
                                <a-textarea v-if="dataAll.setup" style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }"
                                    v-model="dataAll.data.descTc" :placeholder="$t('trade.detail.5umygtiq7xw0')" />
                                <div v-else>{{ dataAll.data.descTc }}</div>
                            </a-form-item>
                        </a-col>
                    </a-row>

                </a-form>
            </a-card>
            <a-card v-if="$permission(['trsAccountChargeAll'])" style="margin-top: 20px;">
                <template #title>
                    <div style="display: flex;justify-content: space-between;margin-bottom:10px;">
                        <a-space :size="18">
                            {{$t('trade.detail.5umygtiq82o0')}}
                        </a-space>
                        <a-space :size="18">
                            <a-button v-permission="['trsAccountChargeCreateBroker']" type="primary"
                                @click="addVisibleBtn(1)">
                                <template #icon>
                                    <icon-plus />
                                </template>
                                {{$t('trade.detail.5umygtiq88g0')}}</a-button>
                        </a-space>
                    </div>
                    <a-space :size="18">
                            <a-select style="width: 180px" @change="optionBtn" scrollbar allow-clear
                                v-model="searchInfo.broker.market" :placeholder="$t('trade.detail.5umygtiq8dc0')">
                                <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                            </a-select>
                            <a-button @click="getChargeSearchList('', 1),searchInfo.broker.market=''">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('trade.detail.5umygtiq8i80')}}
                            </a-button>
                            <a-button @click="getChargeSearchList(searchInfo.broker.market, 1)" type="primary">
                                <template #icon>
                                    <icon-search />
                                </template>
                                {{$t('trade.detail.5umygtiq8ns0')}}
                            </a-button>
                        </a-space>
                </template>
                <a-table :bordered="false" column-resizable :pagination="false"
                    :scroll="charge.list?.length ? { x: '100%', y: '100%' } : undefined"
                    size="small" :data="charge.list" class="table">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('trade.detail.5umygtiq8dc0')" :width="150">
                            <template #cell="{ record }">
                                <a-tag style="margin-right:5px;margin-bottom: 5px;" v-for="item in record.market.split(',')">
                                    {{ useEnumsFormat('market.market', item) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('trade.detail.5umygtiq8rk0')" :width="150">
                            <template #cell="{ record }">
                                <a-tag style="margin-right:5px;margin-bottom: 5px;"
                                    v-for="item in record.security_type.split(',')">
                                    {{ useEnumsFormat('trs.package.trade.create.security_type', item) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('trade.detail.5umygtiq8vg0')" :width="150">
                            <template #cell="{ record }">
                                <div>{{ record.name }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('trade.detail.5umygtiq8yw0')" :width="100">
                            <template #cell="{ record }">
                                <a-tag>{{
                                    useEnumsFormat('trs.package.trade.create.direction', record.direction) }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('trade.detail.5umygtiq9240')" :width="150" data-index="real_name">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('trs.package.trade.create.calculate_type',
                                    record.calculate_type) }}</div>
                                <div v-if="record.calculate_type == 1">{{ Number(record.calculate_value) }}% {{$t('trade.detail.5umygtiq9940')}}</div>
                                <div v-else-if="record.calculate_type == 2">{{ Number(record.calculate_value) }}{{$t('trade.detail.5unxy6i52as0')}}
                                </div>
                                <div v-else>{{ Number(record.calculate_value) }}{{$t('trade.detail.5unxy6i53bo0')}}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('trade.detail.5umygtiq9cs0')" :width="150" data-index="real_name">
                            <template #cell="{ record }">
                                <template v-if="record.calculate_type != 3">
                                    <div>{{$t('trade.detail.5unxy6i53gw0')}}:{{ Number(record.max) }}</div>
                                    <div>{{$t('trade.detail.5unxy6i53jo0')}}:{{ Number(record.min) }}</div>
                                </template>
                                <template v-else>
                                    -
                                </template>

                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('trade.detail.5umygtiq9g00')" :width="100" data-index="real_name">
                            <template #cell="{ record }">
                                <template v-if="record.calculate_type != 3">
                                    <div><a-tag>{{ useEnumsFormat('trs.package.trade.create.round_type', record.round_type) }}</a-tag></div>
                                </template>
                                <template v-else>
                                    -
                                </template>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('trade.detail.5umygtiq9jk0')" :width="130" data-index="round_precision">
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
                        <a-table-column fixed="right" :title="$t('trade.detail.5umygtiq9ms0')" :width="150" v-if="$permission(['trsAccountChargeUpdateBroker','trsAccountChargeDeleteBroker'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-button v-permission="['trsAccountChargeUpdateBroker']" style="padding-left: 0;"
                                        type="text" @click="editBtn(record)" size="small">
                                        {{ $t('trade.detail.5umygtiq6bs0') }}
                                    </a-button>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="`${ $t('trade.detail.5unxy6i53m80')}?` ">
                                        <a-button v-permission="['trsAccountChargeDeleteBroker']" type="text"
                                            status="danger" size="small">
                                            {{ $t('trade.detail.5umygtiq9q80') }}
                                        </a-button>
                                    </a-popconfirm>
                                </a-space>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>
            </a-card>
            <a-card v-if="$permission(['trsAccountChargeAll'])" style="margin-top: 20px;margin-bottom: 20px;">
                <template #title>
                    <div style="display: flex;justify-content: space-between;margin-bottom:10px;">
                        <a-space :size="18">
                            {{$t('trade.detail.5umygtiq9to0')}}
                        </a-space>
                        <a-space :size="18">
                            <a-button v-permission="['trsAccountChargeCreateAgent']" type="primary"
                                @click="addVisibleBtn(2)">
                                <template #icon>
                                    <icon-plus />
                                </template>
                                {{$t('trade.detail.5umygtiq88g0')}}</a-button>
                        </a-space>
                    </div>
                    <a-space :size="18">
                            <a-select style="width: 180px" @change="optionBtn" scrollbar allow-clear
                                v-model="searchInfo.agent.market" :placeholder="$t('trade.detail.5umygtiq8dc0')">
                                <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                            </a-select>
                            <a-button @click="getChargeSearchList('', 2),searchInfo.agent.market=''">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('trade.detail.5umygtiq8i80')}}
                            </a-button>
                            <a-button @click="getChargeSearchList(searchInfo.agent.market, 2)" type="primary">
                                <template #icon>
                                    <icon-search />
                                </template>
                                {{$t('trade.detail.5umygtiq8ns0')}}
                            </a-button>
                        </a-space>
                </template>
                <a-table :bordered="false" column-resizable :pagination="false"
                    :scroll="charge.agentList?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                    :data="charge.agentList" class="table">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('trade.detail.5umygtiq8dc0')" :width="150">
                            <template #cell="{ record }">
                                <a-tag style="margin-right:5px;margin-bottom: 5px;" v-for="item in record.market.split(',')"
                                    >
                                    {{ useEnumsFormat('market.market', item) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('trade.detail.5umygtiq8rk0')" :width="150">
                            <template #cell="{ record }">
                                <a-tag style="margin-right:5px;margin-bottom: 5px;"
                                    v-for="item in record.security_type.split(',')">
                                    {{ useEnumsFormat('trs.package.trade.create.security_type', item) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('trade.detail.5umygtiq8vg0')" :width="150">
                            <template #cell="{ record }">
                                <div>{{ record.name }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('trade.detail.5umygtiq8yw0')" :width="100">
                            <template #cell="{ record }">
                                <a-tag>{{
                                    useEnumsFormat('trs.package.trade.create.direction', record.direction) }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('trade.detail.5umygtiq9240')" :width="150" data-index="real_name">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('trs.package.trade.create.calculate_type',
                                    record.calculate_type) }}</div>
                                <div v-if="record.calculate_type == 1">{{ Number(record.calculate_value) }}% {{$t('trade.detail.5umygtiq9940')}}</div>
                                <div v-else-if="record.calculate_type == 2">{{ Number(record.calculate_value) }}{{$t('trade.detail.5unxy6i52as0')}}
                                </div>
                                <div v-else>{{ Number(record.calculate_value) }}{{$t('trade.detail.5unxy6i53bo0')}}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('trade.detail.5umygtiq9cs0')" :width="150" data-index="real_name">
                            <template #cell="{ record }">
                                <template v-if="record.calculate_type != 3">
                                    <div>{{$t('trade.detail.5unxy6i53gw0')}}:{{ Number(record.max) }}</div>
                                    <div>{{$t('trade.detail.5unxy6i53jo0')}}:{{ Number(record.min) }}</div>
                                </template>
                                <template v-else>
                                    -
                                </template>

                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('trade.detail.5umygtiq9g00')" :width="100" data-index="real_name">
                            <template #cell="{ record }">
                                <template v-if="record.calculate_type != 3">
                                    <div><a-tag>{{ useEnumsFormat('trs.package.trade.create.round_type', record.round_type) }}</a-tag>
                                    </div>
                                </template>
                                <template v-else>
                                    -
                                </template>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('trade.detail.5umygtiq9jk0')" :width="130" data-index="round_precision">
                            <template #cell="{ record }">
                                <template v-if="record.calculate_type != 3">
                                    {{ record.round_precision }}
                                </template>
                                <template v-else>
                                    -
                                </template>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('trade.detail.5umygtiq9ww0')" :width="150">
                            <template #cell="{ record }">
                                {{ dataList.find((item: any) => item.id == record.charge_person_id).name }}
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('trade.detail.5umygtiq9ms0')" :width="150" v-if="$permission(['trsAccountChargeUpdateAgent','trsAccountChargeDeleteAgent'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-button v-permission="['trsAccountChargeUpdateAgent']" style="padding-left: 0;"
                                        type="text" @click="editBtn(record)" size="small">
                                        {{ $t('trade.detail.5umygtiq6bs0') }}
                                    </a-button>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="`${ $t('trade.detail.5unxy6i53m80') }?` ">
                                        <a-button v-permission="['trsAccountChargeDeleteAgent']" type="text" status="danger"
                                            size="small">
                                            {{ $t('trade.detail.5umygtiq9q80') }}
                                        </a-button>
                                    </a-popconfirm>
                                </a-space>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>
            </a-card>
        </a-card>
        <a-modal width="600px" :mask-closable=false v-model:visible="addVisible" :on-before-ok="handleAdd"
            @close="onCloseAdd">
            <template #title>
                {{ visibleTitle == 1 ? $t('trade.detail.5umygtiqa0g0') : $t('trade.detail.5umygtiqa3w0') }}
            </template>
            <div style="display: flex;">
                <a-form ref="formRefs" :model="addForm" :rules="(dataAll.ruleCreate as any)" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="market" :label="$t('trade.detail.5umygtiq8dc0')">
                                <a-select @change="optionBtn" scrollbar allow-clear multiple v-model="addForm.market"
                                    :placeholder="$t('trade.detail.5umygtiq8dc0')">
                                    <a-option v-for="item in useEnums('market.market')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="security_type" :label="$t('trade.detail.5umygtiq8rk0')">
                                <a-select allow-clear scrollbar multiple v-model="addForm.security_type" :placeholder="$t('trade.detail.5umygtiq8rk0')">
                                    <a-option v-for="item in securityType" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="nameZh" :label="$t('trade.detail.5umygtiqa7c0')">
                                <a-input v-model="addForm.nameZh" :placeholder="$t('trade.detail.5umygtiqaas0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="nameEn" :label="$t('trade.detail.5umygtiqaeg0')">
                                <a-input v-model="addForm.nameEn" :placeholder="$t('trade.detail.5umygtiqahk0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="nameTc" :label="$t('trade.detail.5umygtiqaq80')">
                                <a-input v-model="addForm.nameTc" :placeholder="$t('trade.detail.5umygtiqayg0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="type" :label="$t('trade.detail.5umygtiqb1g0')">
                                <a-select style="color:#000" disabled allow-clear v-model="addForm.type" :placeholder="$t('trade.detail.5umygtiqb4k0')">
                                    <a-option v-for="item in useEnums('trs.package.trade.create.type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="addForm.type == 2" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item v-if="addForm.type == 2" field="charge_person_id" :label="$t('trade.detail.5umygtiq9ww0')">
                                <a-select allow-clear v-model="addForm.charge_person_id" :placeholder="$t('trade.detail.5umygtiqb4k0')">
                                    <a-option v-for="item in dataList" :value="item.id">{{
                                        item.name }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="direction" :label="$t('trade.detail.5umygtiq8yw0')">
                                <a-select allow-clear v-model="addForm.direction" :placeholder="$t('trade.detail.5umygtiqb4k0')">
                                    <a-option v-for="item in useEnums('trs.package.trade.create.direction')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="calculate_type" :label="$t('trade.detail.5umygtiq9240')">
                                <a-select allow-clear v-model="addForm.calculate_type" :placeholder="$t('trade.detail.5umygtiqb4k0')">
                                    <a-option v-for="item in useEnums('trs.package.trade.create.calculate_type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="calculate_value" :label="$t('trade.detail.5umygtiqb7s0')">
                                <div style="width: 100%;">
                                    <a-input-number hide-button style="width: 100%;" v-model="addForm.calculate_value"
                                        :placeholder="$t('trade.detail.5umygtiqbbk0')">
                                        <template #append>{{ addForm.calculate_type == '1' ? '%' : '' }}</template>
                                    </a-input-number>
                                    <p style="margin-bottom: 0;margin-top:15px">{{$t('trade.detail.5umygtiqbec0')}}</p>
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="addForm.calculate_type != '3'" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="min" :label="$t('trade.detail.5umygtiqbhk0')">
                                <a-input-number hide-button style="width: 100%;" v-model="addForm.min" :placeholder="$t('trade.detail.5umygtiqbbk0')">
                                </a-input-number>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="addForm.calculate_type != '3'" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="max" :label="$t('trade.detail.5umygtiqbkk0')">
                                <a-input-number hide-button style="width: 100%;" v-model="addForm.max" :placeholder="$t('trade.detail.5umygtiqbbk0')">
                                </a-input-number>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="addForm.calculate_type != '3'" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="round_type" :label="$t('trade.detail.5umygtiq9g00')">
                                <a-select allow-clear v-model="addForm.round_type" :placeholder="$t('trade.detail.5umygtiqb4k0')">
                                    <a-option v-for="item in useEnums('trs.package.trade.create.round_type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="addForm.calculate_type != '3'" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="round_precision" :label="$t('trade.detail.5umygtiqbow0')">
                                <a-input-number hide-button style="width: 100%;" v-model="addForm.round_precision"
                                    :placeholder="$t('trade.detail.5umygtiqbbk0')">
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
import { useEnumsFormat, useEnums } from '@/hooks/enums'
// import dayjs from 'dayjs'
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const { t } = useI18n();
const loading = ref(false)
const searchInfo = ref({
    broker: {
        market: ''
    },
    agent: {
        market: ''

    }
})

const dataAll: any = reactive({
    info: {},
    data: {
        nameZh: '',
        nameEn: '',
        nameTc: '',
        descZh: '',
        descEn: '',
        descTc: '',
    },
    setup: false,
    loading: false,
    rules: {
        nameZh: [{ required: true, message: t('trade.detail.5umygtiqbrs0') }],
        nameEn: [{ required: true, message: t('trade.detail.5umygtiqbuw0') }],
        nameTc: [{ required: true, message: t('trade.detail.5umygtiqbxs0') }],
        descZh: [{ required: true, message: t('trade.detail.5umygtiq7fk0') }],
        descEn: [{ required: true, message: t('trade.detail.5umygtiq7oo0') }],
        descTc: [{ required: true, message: t('trade.detail.5umygtiq7xw0') }]
    },
    ruleCreate: {
        nameZh: [{ required: true, message: t('trade.detail.5umygtiqaas0') }],
        nameEn: [{ required: true, message: t('trade.detail.5umygtiqayg0') }],
        nameTc: [{ required: true, message: t('trade.detail.5umygtiqahk0') }],
        type: [{ required: true, message: t('trade.detail.5umygtiqc0k0') }],
        market: [{ required: true, message: t('trade.detail.5umygtiqc3o0') }],
        security_type: [{ required: true, message: t('trade.detail.5umygtiqc6k0') }],
        charge_person_id: [{ required: true, message: t('trade.detail.5umygtiqc9g0') }],
        direction: [{ required: true, message: t('trade.detail.5umygtiqccc0') }],
        calculate_type: [{ required: true, message: t('trade.detail.5umygtiqcf80') }],
        round_type: [{ required: true, message: t('trade.detail.5umygtiqcis0') }],
        round_precision: [{ required: true, message: t('trade.detail.5umygtiqcls0') }],
        calculate_value: [{ required: true, message: t('trade.detail.5umygtiqcos0') }],
    }
})
const charge: any = reactive({
    list: [],
    agentList: [],
    loading: false,
})
const getData = async () => {
    loading.value = true
    const { code, data } = await apiTrs.accountChargePackageInfo({
        id: route.params?.id
    })
    loading.value = false
    if (code != 1) return;
    dataAll.info = data
    dataAll.data.nameZh = data.name['zh-CN']
    dataAll.data.nameEn = data.name['en']
    dataAll.data.nameTc = data.name['tc']
    dataAll.data.descZh = data.desc['zh-CN']
    dataAll.data.descEn = data.desc['en']
    dataAll.data.descTc = data.desc['tc']
}
const getChargeList = async () => {
    await getDataList()
    charge.loading = true
    charge.list = []
    charge.agentList = []
    const { code, data } = await apiTrs.accountChargeAll({
        'filter[charge_package_id]': route.params?.id
    })
    charge.loading = false
    if (code != 1) return;
    if (!data?.length) {
        charge.list = []
        return
    }
    data.forEach((item: any) => {
        if (item.type == 1) {
            charge.list.push(item)
        } else {
            charge.agentList.push(item)
        }
    })
    // charge.list = data

}
const getChargeSearchList = async (market: any, type: any) => {
    const { code, data } = await apiTrs.accountChargeAll({
        'filter[charge_package_id]': route.params?.id,
        'filter[market]': market,
        'filter[type]': type,
    })
    if (code != 1) return;
    
    if (type == 1) {
        charge.list = []
        if(!Object.keys(data)?.length) return
        Object.keys(data).forEach((item:any)=>{
            charge.list.push(data[item])
        })
        
    } else {
        charge.agentList = []
        if(!Object.keys(data)?.length) return
        Object.keys(data).forEach((item:any)=>{
            charge.agentList.push(data[item])
        })
    }
}
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    const { code } = await apiTrs.accountChargePackageUpdate({
        data: {
            name: {
                'zh-CN': dataAll.data.nameZh,
                'en': dataAll.data.nameEn,
                'tc': dataAll.data.nameTc,
            },
            desc: {
                'zh-CN': dataAll.data.descZh,
                'en': dataAll.data.descEn,
                'tc': dataAll.data.descTc,
            },
            id: route.params?.id,
            status: dataAll.info.status
        }
    })
    if (code != 1) return;
    dataAll.setup = false
    getData()
}

const deleteBtn = async (val: any) => {
    const res: any = await apiTrs.accountChargeDelete({
        id: val.id + '',
    });
    if (res.code != 1) return
    getChargeList()
}
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
    id: 0,
    charge_package_id: route.params?.id
})

const addVisible = ref(false)
const addVisibleBtn = (num: any) => {
    visibleTitle.value = 1
    addForm.value.type = num
    addVisible.value = true
}
const visibleTitle = ref(1)
const editBtn = async (val: any) => {
    visibleTitle.value = 2
    let obj = await getaccountChargeInfo(val.id)
    Object.keys(obj).forEach(key => {
        if (addForm.value.hasOwnProperty(key)) {
            addForm.value[key] = obj[key];
        }
    });
    addForm.value.calculate_value = Number(val.calculate_value)
    addForm.value.max = Number(val.max)
    addForm.value.min = Number(val.min)
    addForm.value.market = val.market.split(',')
    addForm.value.security_type = []
    val.security_type.split(',').forEach((item: any) => {
        addForm.value.security_type.push(item)
    })
    addForm.value.type = val.type
    addForm.value.round_type = addForm.value.round_type == 0 ? '' : addForm.value.round_type
    addForm.value.round_precision = Number(val.round_precision)

    addForm.value.nameZh = obj.name['zh-CN']
    addForm.value.nameEn = obj.name['en']
    addForm.value.nameTc = obj.name['tc']

    optionBtn(1)
    addVisible.value = true
}
const formRefs = ref()
const handleAdd = async () => {
    const validate = await formRefs.value?.validate()
    if (validate) return false;
    if (addForm.value.calculate_type == '1') {
        if (addForm.value.max != 0 || addForm.value.min != 0) {
            if (addForm.value.max < addForm.value.min) {
                formRefs.value.setFields({
                    max: {
                        status: 'error',
                        message: t('trade.detail.5umygtiqcro0')
                    }
                })
                return false
            }
        }

    }

    addForm.value.charge_package_id = route.params?.id
    addForm.value.name = {
        'zh-CN': addForm.value.nameZh,
        'en': addForm.value.nameEn,
        'tc': addForm.value.nameTc,
    }
    let bool = addForm.value.market.some((item: any) => item == 'ALL')
    if (bool) {
        addForm.value.market = 'ALL'
    } else {
        addForm.value.market = addForm.value.market.join(',')
    }
    let bool1 = addForm.value.security_type.some((item: any) => item == 'ALL')
    if (bool1) {
        addForm.value.security_type = 'ALL'
    } else {
        addForm.value.security_type = addForm.value.security_type.join(',')
    }
    delete addForm.value.nameZh
    delete addForm.value.nameEn
    delete addForm.value.nameTc
    if (addForm.value.id) {
        const res: any = await apiTrs.accountChargeUpdate({
            data: addForm.value
        });
        if (res.code != 1) return false
    } else {
        const res: any = await apiTrs.accountChargeCreate({
            data: addForm.value
        });
        if (res.code != 1) return false
    }

    getChargeList()
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
        id: 0,
        charge_package_id: route.params?.id
    }
    formRefs.value.resetFields()
}
//收费项详情
const getaccountChargeInfo = async (id: any) => {
    const { code, data } = await apiTrs.accountChargeInfo({ id: id });
    if (code != 1) return;
    return data
}
// 券商收费项
const securityType: any = ref([])
const optionBtn = (val?: any) => {
    let type = useEnums('trs.package.trade.create.security_type')
    securityType.value = []

    if (val != 1) {
        addForm.value.security_type = []
    }
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
const dataList: any = ref([])
const getDataList = async () => {
    const { code, data } = await apiTrs.accountChargePersonAll({
        ...useFilter({ status: 1 })
    })
    if (code != 1) return;
    dataList.value = data
}
{
    
    getChargeList()
    getData()
}


</script>

<style lang="less" scoped>
:deep(.arco-form-item-label-col > .arco-form-item-label) {
    color: var(--color-text-3);
}
:deep(.arco-card-header){
    height: 100px;
}
</style>