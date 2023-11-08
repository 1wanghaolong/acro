
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="accountId" :label="$t('info.info.5ukkwvua9qc0')">
                                <a-input v-model="searchInfo.data.accountId" :placeholder="$t('info.info.5ukkwvuagks0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="realName" :label="$t('info.info.5ukkwvuah3g0')">
                                <a-input v-model="searchInfo.data.realName" :placeholder="$t('info.info.5ukkwvuagks0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="type" :label="$t('info.info.5ukkwvuahig0')">
                                <a-select allow-clear v-model="searchInfo.data.type"
                                    :placeholder="$t('info.info.5ukkwvuahtc0')">
                                    <a-option v-for="item in useEnums('cms.client.info.type')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('info.info.5ukkwvuai2g0')">
                                <a-select allow-clear v-model="searchInfo.data.status"
                                    :placeholder="$t('info.info.5ukkwvuahtc0')">
                                    <a-option v-for="item in useEnums('cms.client.info.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <div class="buttonBox">
                <a-space :size="18">
                    <a-button @click="searchInfo.show = !searchInfo.show">
                        <template #icon>
                            <icon-filter />
                        </template>
                        {{ searchInfo.show ? $t('info.info.5ukkwvuai8c0') : $t('info.info.5ukkwvuaiek0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{ $t('info.info.5ukkwvuail40') }}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{ $t('info.info.5ukkwvuajx00') }}
                    </a-button>
                </a-space>
                <a-space :size="18">
                </a-space>
            </div>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                    :data="tableData.list" class="table">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column title="ID" data-index="id" :width="60"></a-table-column>
                        <a-table-column :title="$t('info.info.5ukkwvua9qc0')" data-index="account_id"
                            :width="100"></a-table-column>
                        <a-table-column :title="$t('info.info.5ukkwvuah3g0')" data-index="real_name" :ellipsis="true"
                            :tooltip="true" :width="120">
                        </a-table-column>
                        <a-table-column :title="$t('info.info.5ukkwvuahig0')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.client.info.type', record.type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('info.info.5ukkwvuakyo0')" data-index="mobile">
                            <template #cell="{ record }">
                                <div v-if="record.type == 2 && record.from_data.mobile">
                                    ({{ record.from_data.country_code }}){{ record.from_data.mobile }}
                                </div>
                                <div v-else-if="record.type == 3 && record.from_data.email">
                                    {{ record.from_data.email }}
                                </div>
                                <div v-else-if="record.type == 4">
                                    <div
                                        v-if="!record.from_data.country && !record.from_data.province && !record.from_data.city && !record.from_data.district && !record.from_data.detail_address">
                                        -</div>
                                    <div v-else>
                                        {{ record.from_data.country }}{{ record.from_data.province }}{{
                                            record.from_data.city }}{{ record.from_data.district }}{{
        record.from_data.detail_address }}
                                    </div>
                                </div>
                                <div v-else-if="record.type == 5">
                                    <div
                                        v-if="!record.from_data.real_name && !record.from_data.english_name && !record.from_data.birthday && !record.from_data.sex && !record.from_data.id_card">
                                        -
                                    </div>
                                    <div v-else>
                                        <div>
                                            {{ $t('info.info.5ukl4xtv27k0') }}:{{ record.from_data.real_name || '-' }}
                                        </div>
                                        <div>
                                            {{ $t('info.info.5ukl4xtv4uo0') }}:{{ record.from_data.english_name || '-' }}
                                        </div>
                                        <div>
                                            {{ $t('info.info.5ukl4xtv58g0') }}:{{ useEnumsFormat('otc.customer.otc.sex',
                                                record.from_data.sex) }}
                                        </div>
                                        <div>
                                            {{ $t('info.info.5ukl4xtv5ds0') }}:{{ record.from_data.id_card || '-' }}
                                        </div>
                                        <div>
                                            {{ $t('info.info.5ukl4xtv5jg0') }}:{{ record.from_data.birthday || '-' }}
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    -
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('info.info.5ukkwvualqk0')" data-index="mobile">
                            <template #cell="{ record }">
                                <div v-if="record.type == 2">
                                    ({{ record.to_data.country_code }}){{ record.to_data.mobile }}
                                </div>
                                <div v-else-if="record.type == 3">
                                    {{ record.to_data.email }}
                                </div>
                                <div v-else-if="record.type == 4">
                                    {{ record.to_data.country }}{{ record.to_data.province }}{{ record.to_data.city }}{{
                                        record.to_data.district }}{{ record.to_data.detail_address }}
                                </div>
                                <div v-else-if="record.type == 5">
                                    <div
                                        v-if="!record.to_data.real_name && !record.to_data.english_name && !record.to_data.birthday && !record.to_data.sex && !record.to_data.id_card">
                                        -
                                    </div>
                                    <div v-else>
                                        <div>
                                            {{ $t('info.info.5ukl4xtv27k0') }}:{{ record.to_data.real_name || '-' }}
                                        </div>
                                        <div>
                                            {{ $t('info.info.5ukl4xtv4uo0') }}:{{ record.to_data.english_name || '-' }}
                                        </div>
                                        <div>
                                            {{ $t('info.info.5ukl4xtv58g0') }}:{{ useEnumsFormat('otc.customer.otc.sex',
                                                record.to_data.sex) }}
                                        </div>
                                        <div>
                                            {{ $t('info.info.5ukl4xtv5ds0') }}:{{ record.to_data.id_card || '-' }}
                                        </div>
                                        <div>
                                            {{ $t('info.info.5ukl4xtv5jg0') }}:{{ record.to_data.birthday || '-' }}
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('info.info.5ukkwvuam1o0')" :width="local.lang == 'en' ? 130 : 120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('info.info.5ukkwvuai2g0')" :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('cms.client.info.status', record.status) }}
                            </template>
                        </a-table-column>
                        <a-table-column v-if="$permission(['cmsUserCounterRecordUpdate'])" fixed="right"
                            :title="$t('info.info.5ukkwvuame80')" :width="80">
                            <template #cell="{ record }">
                                <a-space v-if="record.status == 0">
                                    <a-link v-if="$permission(['cmsUserCounterRecordUpdate'])" @click="updateBtn(record)">{{
                                        $t('info.info.5ukkwvuamoc0') }}</a-link>
                                </a-space>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>
            </div>
            <div class="pagination">
                <a-pagination size="small" @change="getData" @page-size-change="getData"
                    v-model:current="searchInfo.data.page" v-model:page-size="searchInfo.data.per_page"
                    :total="tableData.count" show-total show-jumper show-page-size />
            </div>
        </a-card>
        <a-modal width="600px" :mask-closable=false v-model:visible="showVisibleUpdate" :on-before-ok="handleUpdateSubmit"
            @close="onClose">
            <template #title>
                {{ $t('info.info.5ukkwvuamoc0') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
                    <template v-if="form.data.type == 2">
                        <a-row :gutter="16">
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item field="type" :label="$t('info.info.5ukkwvuahig0')">
                                    <a-select disabled allow-clear v-model="form.data.type"
                                        :placeholder="$t('info.info.5ukkwvuahtc0')">
                                        <a-option v-for="item in useEnums('cms.client.info.type')" :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuamt00')">
                                    <a-input disabled v-model="form.data.from_data.country_code"
                                        :placeholder="$t('info.info.5ukkwvuamt00')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuamy00')">
                                    <a-input disabled v-model="form.data.from_data.mobile"
                                        :placeholder="$t('info.info.5ukkwvuamy00')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuan3s0')">
                                    <a-input disabled v-model="form.data.to_data.country_code"
                                        :placeholder="$t('info.info.5ukkwvuan3s0')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuandg0')">
                                    <a-input disabled v-model="form.data.to_data.mobile"
                                        :placeholder="$t('info.info.5ukkwvuandg0')">
                                    </a-input>
                                </a-form-item>
                            </a-col>

                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :rules="[{ required: true, message: $t('info.info.5ukkwvuanow0') }]"
                                    field="status" :label="$t('info.info.5ukkwvuao2k0')">
                                    <a-radio-group v-model="form.data.status"
                                        :options="useEnums('cms.client.info.status1')">
                                        <template #label="{ data }">
                                            <p>{{ data.trans[local.lang] }}</p>
                                        </template>
                                    </a-radio-group>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </template>
                    <template v-if="form.data.type == 3">
                        <a-row :gutter="16">
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item field="type" :label="$t('info.info.5ukkwvuahig0')">
                                    <a-select disabled allow-clear v-model="form.data.type"
                                        :placeholder="$t('info.info.5ukkwvuahtc0')">
                                        <a-option v-for="item in useEnums('cms.client.info.type')" :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuaoik0')">
                                    <a-input disabled v-model="form.data.from_data.email"
                                        :placeholder="$t('info.info.5ukkwvuaoik0')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuaoq40')">
                                    <a-input disabled v-model="form.data.to_data.email"
                                        :placeholder="$t('info.info.5ukkwvuaoq40')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :rules="[{ required: true, message: $t('info.info.5ukkwvuanow0') }]"
                                    field="status" :label="$t('info.info.5ukkwvuao2k0')">
                                    <a-radio-group v-model="form.data.status"
                                        :options="useEnums('cms.client.info.status1')">
                                        <template #label="{ data }">
                                            <p>{{ data.trans[local.lang] }}</p>
                                        </template>
                                    </a-radio-group>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </template>
                    <template v-if="form.data.type == 4">
                        <a-row :gutter="16">
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item field="type" :label="$t('info.info.5ukkwvuahig0')">
                                    <a-select disabled allow-clear v-model="form.data.type"
                                        :placeholder="$t('info.info.5ukkwvuahtc0')">
                                        <a-option v-for="item in useEnums('cms.client.info.type')" :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuaovs0')">
                                    <a-input disabled v-model="form.data.from_data.country"
                                        :placeholder="$t('info.info.5ukkwvuaovs0')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuap3g0')">
                                    <a-input disabled v-model="form.data.from_data.province"
                                        :placeholder="$t('info.info.5ukkwvuap3g0')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuap9w0')">
                                    <a-input disabled v-model="form.data.from_data.city"
                                        :placeholder="$t('info.info.5ukkwvuap9w0')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuaph40')">
                                    <a-input disabled v-model="form.data.from_data.district"
                                        :placeholder="$t('info.info.5ukkwvuaph40')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuaplg0')">
                                    <a-input disabled v-model="form.data.from_data.detail_address"
                                        :placeholder="$t('info.info.5ukkwvuaplg0')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuappc0')">
                                    <a-input disabled v-model="form.data.to_data.country"
                                        :placeholder="$t('info.info.5ukkwvuappc0')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuapss0')">
                                    <a-input disabled v-model="form.data.to_data.province"
                                        :placeholder="$t('info.info.5ukkwvuapss0')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuapy40')">
                                    <a-input disabled v-model="form.data.to_data.city"
                                        :placeholder="$t('info.info.5ukkwvuapy40')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuaq6c0')">
                                    <a-input disabled v-model="form.data.to_data.district"
                                        :placeholder="$t('info.info.5ukkwvuaq6c0')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuaqm00')">
                                    <a-input disabled v-model="form.data.to_data.detail_address"
                                        :placeholder="$t('info.info.5ukkwvuaqm00')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :rules="[{ required: true, message: $t('info.info.5ukkwvuanow0') }]"
                                    field="status" :label="$t('info.info.5ukkwvuao2k0')">
                                    <a-radio-group v-model="form.data.status"
                                        :options="useEnums('cms.client.info.status1')">
                                        <template #label="{ data }">
                                            <p>{{ data.trans[local.lang] }}</p>
                                        </template>
                                    </a-radio-group>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </template>
                    <template v-if="form.data.type == 5">
                        <a-row :gutter="16">
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item field="type" :label="$t('info.info.5ukkwvuahig0')">
                                    <a-select disabled allow-clear v-model="form.data.type"
                                        :placeholder="$t('info.info.5ukkwvuahtc0')">
                                        <a-option v-for="item in useEnums('cms.client.info.type')" :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuaqqo0')">
                                    <a-input disabled v-model="form.data.from_data.real_name"
                                        :placeholder="$t('info.info.5ukkwvuaqqo0')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuaquo0')">
                                    <a-input disabled v-model="form.data.from_data.english_name"
                                        :placeholder="$t('info.info.5ukkwvuaquo0')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuaqxc0')">
                                    <a-select disabled allow-clear v-model="form.data.from_data.sex"
                                        :placeholder="$t('info.info.5ukkwvuaqxc0')">
                                        <a-option v-for="item in useEnums('otc.customer.otc.sex')" :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkzkj3qio0')">
                                    <a-input disabled v-model="form.data.from_data.id_card"
                                        :placeholder="$t('info.info.5ukkzkj3qio0')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuaqzg0')">
                                    <a-input disabled v-model="form.data.from_data.birthday"
                                        :placeholder="$t('info.info.5ukkwvuaqzg0')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuar2g0')">
                                    <a-input disabled v-model="form.data.to_data.real_name"
                                        :placeholder="$t('info.info.5ukkwvuar2g0')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuar5c0')">
                                    <a-input disabled v-model="form.data.to_data.english_name"
                                        :placeholder="$t('info.info.5ukkwvuar5c0')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuar800')">
                                    <a-select disabled allow-clear v-model="form.data.to_data.sex"
                                        :placeholder="$t('info.info.5ukkwvuar800')">
                                        <a-option v-for="item in useEnums('otc.customer.otc.sex')" :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkzkj3zv00')">
                                    <a-input disabled v-model="form.data.to_data.id_card"
                                        :placeholder="$t('info.info.5ukkzkj3zv00')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('info.info.5ukkwvuara40')">
                                    <a-input disabled v-model="form.data.to_data.birthday"
                                        :placeholder="$t('info.info.5ukkwvuara40')">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :rules="[{ required: true, message: $t('info.info.5ukkwvuanow0') }]"
                                    field="status" :label="$t('info.info.5ukkwvuao2k0')">
                                    <a-radio-group v-model="form.data.status"
                                        :options="useEnums('cms.client.info.status1')">
                                        <template #label="{ data }">
                                            <p>{{ data.trans[local.lang] }}</p>
                                        </template>
                                    </a-radio-group>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </template>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat, useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        accountId: '',
        realName: '',
        status: '',
        type: '',
        page: 1,
        per_page: 20
    }
})
const tableData = reactive({
    list: [],
    count: 0,
    message: [],
    loading: false
})
const getData = async () => {
    tableData.loading = true
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    const { code, data } = await apiCms.cmsUserCounterRecordList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}


const formRef = ref()
const form: any = reactive({
    data: {

    },
    rules: {
        'status': [{ required: true, message: t('info.info.5ukkwvuanow0') }],
    }
})
const onClose = async () => {
    formRef.value.resetFields()
}
const showVisibleUpdate = ref(false)
const updateBtn = (val: any) => {
    form.data = { ...val }
    form.data.status = ''
    if (form.data.to_data.sex) {
        form.data.to_data.sex = Number(form.data.to_data.sex)
    }
    console.log(form.data);
    showVisibleUpdate.value = true
}
const handleUpdateSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    if (form.data.status == 1) {
        const { code, msg } = await apiCms.cmsUserCounterRecordPass({
            recordId: form.data.id,

        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    } else {
        const { code, msg } = await apiCms.cmsUserCounterRecordReject({
            recordId: form.data.id,

        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    }

}
{
    getData()
}
</script>
<style scoped>
:deep(.arco-typography) {
    margin-bottom: 0;
}

:deep(.arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}

:deep(.arco-input[disabled]::placeholder) {
    -webkit-text-fill-color: var(--color-text-4)
}

:deep(.arco-select-view-disabled) {
    -webkit-text-fill-color: var(--color-text-1);
}
</style>