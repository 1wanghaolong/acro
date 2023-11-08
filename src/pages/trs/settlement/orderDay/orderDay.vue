<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="trs_account" :label="`TRS${ $t('orderDay.orderDay.5umxqmc3tgw0') }`">
                                <a-input v-model="searchInfo.data.trs_account" :placeholder="$t('orderDay.orderDay.5um7zpovmwk0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('orderDay.orderDay.5um7zpovkqo0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('orderDay.orderDay.5um7zpovmwk0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('orderDay.orderDay.5um7zpovnw80')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('orderDay.orderDay.5um7zpovmwk0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="currency" :label="$t('orderDay.orderDay.5umxqmc3u4w0')">
                                <a-select allow-clear v-model="searchInfo.data.currency" :placeholder="$t('orderDay.orderDay.5umxqmc3u800')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="time" :label="$t('orderDay.orderDay.5um7zpovnkg0')">
                                <a-range-picker v-model="searchInfo.data.time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('orderDay.orderDay.5um7zpovs100') : $t('orderDay.orderDay.5um7zpovtqc0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('orderDay.orderDay.5um7zpovu6w0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('orderDay.orderDay.5um7zpovug40')}}
                    </a-button>
                </a-space>
                <!-- <a-space :size="18">
                    <a-button type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('orderDay.orderDay.5um7zpovuq00')}}
                    </a-button>
                    
                </a-space> -->
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
                        <a-table-column :title="$t('orderDay.orderDay.5um7zpovnkg0')">
                            <template #cell="{ record }">
                                <div>{{ record.end_time ? dayjs.unix(record.end_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <!-- <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div> -->
                            </template>
                        </a-table-column>
                        <a-table-column :title="`TRS${ $t('orderDay.orderDay.5umxqmc3ua80') }`" data-index="trs_account_info.account"  :ellipsis="true"
                            :tooltip="true">
                            <template #cell="{ record }">
                                {{record.trs_account_info.account || "--"}}
                            </template>
                        </a-table-column>
                            <a-table-column :title="$t('orderDay.orderDay.5um7zpovnw80')" data-index="net_profit">
                            <template #cell="{ record }">
                                <span>CN:
                                    <span>{{ record.asset_account_info.real_name }}</span></span>
                                <br>
                                <span>EN:
                                    <span>{{ record.asset_account_info.english_name }}</span></span>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('orderDay.orderDay.5um7zpovkqo0')" data-index="asset_account_info.account"  :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('orderDay.orderDay.5umxqmc3ucc0')" data-index="currency" >
                            <template #cell="{ record }">
                                {{ record.trs_account_info.currency || "--" }}
                            </template>
                        </a-table-column>
                        <a-table-column
                            v-if="$permission(['TRSSettlementOrderDayDetails', 'TRSSettlementOrderDayDownload'])"
                            fixed="right" :title="$t('orderDay.orderDay.5um7zpovvf00')" :width="local.lang == 'en'?160:120">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['TRSSettlementOrderDayDetails']"
                                        @click="toPath(record)">{{$t('orderDay.orderDay.5um7zpovvlc0')}}</a-link>
                                    <!-- <a :href="record.file_path" target="_bank" >下载</a> -->
                                    <a-link v-permission="['TRSSettlementOrderDayDownload']"
                                        @click="toPath(record, 1)">{{$t('orderDay.orderDay.5um7zpovw880')}}</a-link>
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
    </div>
</template>

<script lang="ts" setup>
// import { apiWealthPositionList, apiWealthOptionsProductAll } from '@/api'
import { useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
// const router = useRouter()
const searchFormRef = ref()
const searchInfo:any = reactive({
    show: false,
    data: {
        trs_account:"",
        asset_account: '',
        real_name:"",
        currency:"",
        time: [],
        type: '1',
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
        if (!param[item] && param[item] != '0' || item == 'time') {
            delete param[item];
        }
    })
    const { code, data } = await apiTrs.trsAccountStatementList({
        ...useFilter(param),
        ...{
            'filter[start_time]': searchInfo.data?.time[0],
            'filter[end_time]': searchInfo.data?.time[1]
        }
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}

{
    getData()
}
const toPath = async (record: any, num?: any) => {
    if (!num) {
        const fileURL = record.file_path; // PDF文件的URL
        const link = document.createElement('a');
        link.href = fileURL;
        link.target = '_blank';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        const fileURL = record.file_path; // PDF文件的URL
        console.log(record.file_path);
        const regex = /\/([^/]+)\.pdf$/
        const match = record.file_path.match(regex);
        const fileName = match[1] || '日结单'//record.file_name // 下载的文件名
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

}
</script>