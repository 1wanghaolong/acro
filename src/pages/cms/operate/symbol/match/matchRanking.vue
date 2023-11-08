
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">

                    </a-row>
                </a-form>
            </div>
            <div class="buttonBox">
                <a-space :size="18">
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('match.matchRanking.5ukj8v3vw440')}}
                    </a-button>
                    <a-button @click="router.back()">
                        {{$t('match.matchRanking.5ukj8v3wb6g0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-popover v-if="$permission(['cmsOperateQuoteMatchRankingDownload'])" trigger="click"
                        position="bottom">
                        <a-button :loading="tableData.loading">
                            <template #icon>
                                <icon-to-bottom />
                            </template>
                            {{$t('match.matchRanking.5ukj8v3wc1g0')}}
                        </a-button>
                        <template #content>
                            <div style="text-align: center;">
                                <p @click="download(1)" style="cursor: pointer;margin-bottom:10px">{{$t('match.matchRanking.5ukj8v3wcmo0')}}</p>
                                <p @click="download(2)" style="cursor: pointer;">{{$t('match.matchRanking.5ukj8v3wcwk0')}}</p>
                            </div>
                        </template>
                    </a-popover>
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
                        <a-table-column :title="$t('match.matchRanking.5ukj8v3wd6o0')" data-index="ranking" :width="100"></a-table-column>
                        <a-table-column :title="$t('match.matchRanking.5ukj8v3wduo0')" data-index="mobile" :width="130" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('match.matchRanking.5ukj8v3wei00')" data-index="nickname" :width="140" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('match.matchRanking.5ukj8v3wes00')" data-index="profit_rate" :width="120">
                            <template #cell="{ record }">
                                {{ record.profit_rate > 0 ? '+' : '' }}{{ $dataFormat(record.profit_rate * 100) }}%
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.matchRanking.5ukj8v3wf5k0')" data-index="profit" :width="120">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.profit) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.matchRanking.5ukj8v3wfgw0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.calc_time ? dayjs.unix(record.calc_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.calc_time ? dayjs.unix(record.calc_time).format('HH:mm:ss') : '--' }}
                                </div>
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
// import { useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
import { dataFormat } from '@/hooks/permission'
// const local = useLocal()
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter()
const route = useRoute()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        match_id: route.params?.id,
        nickname: '',
        mobile: '',
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
    const { code, data } = await apiCms.cmsMatchRankingList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
// 导出
const download = async (num: any) => {
    let strTitle = `排名/Ranking,账号/Account,昵称/Nickname,盈亏金额/Profit,累计盈亏率/Profit Rate\n`
    let name = 'match-ranking-' + dayjs(new Date()).format('YYYY-MM-DD')
    let list = []
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    tableData.loading = true
    if (num == 1) {
        param.page = 1
        let pageNum = Math.ceil(tableData.count / searchInfo.data.per_page)
        for (let i = 1; i <= pageNum; i++) {
            param.page = i
            const { data } = await apiCms.cmsMatchRankingList({
                ...useFilter(param)
            })
            list.push(...data.list)
        }
    } else {
        const { data } = await apiCms.cmsMatchRankingList({
            ...useFilter(param)
        })
        list.push(...data.list)
    }
    tableData.loading = false
    if (!list.length) return Message.warning({ content: t('match.matchRanking.5ukj8v3wi440') });
    let downloadList = listValue(strTitle, list)
    downloadExcel(downloadList, name)
}
const listValue = (strTitle: any, list: any) => {
    //定义表头
    if (!list.length) {
        return
    }
    let str = strTitle
    list.forEach((item: any) => {
        str += `${item?.ranking}\t,`
        str += `${item?.mobile}\t,`
        str += `${item?.nickname}\t,`
        str += `${item?.profit}\t,`
        str += `${item.profit_rate > 0 ? '+' + dataFormat(item.profit_rate * 100) + '%' : dataFormat(item.profit_rate * 100) + '%'}\t,`
        str += '\n'
    })
    return str
}

{
    getData()
}
</script>
<style scoped>
:deep(.arco-typography) {
    margin-bottom: 0;
}
</style>