<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="title" :label="$t('problem.problem.5ui17qcft840')">
                                <a-input v-model="searchInfo.data.title"
                                    :placeholder="$t('problem.problem.5ui17qcg4mo0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="typeId" :label="$t('problem.problem.5ui17qcg4ys0')">
                                <a-select allow-clear v-model="searchInfo.data.typeId"
                                    :placeholder="$t('problem.problem.5ui17qcgd3w0')">
                                    <a-option v-for="item in helpQuestionTypeList" :value="item.id">{{
                                        item.name }}</a-option>
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
                        {{ searchInfo.show ? $t('problem.problem.5ui17qcgdkg0') : $t('problem.problem.5ui17qcgdvs0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{ $t('problem.problem.5ui17qcge800') }}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{ $t('problem.problem.5ui17qcgg300') }}
                    </a-button>
                </a-space>
                <a-space :size="18" v-permission="['cmsHelpProblemCreate']">
                    <a-button @click="router.push({ name: 'cmsHelpProblemCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{ $t('problem.problem.5ui17qcggbk0') }}
                    </a-button>
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
                        <a-table-column title="ID" data-index="id" :width="80"></a-table-column>
                        <a-table-column :title="$t('problem.problem.5ui17qcft840')" data-index="title"
                            :width="140"></a-table-column>
                        <a-table-column :title="$t('problem.problem.5ui17qcg4ys0')" data-index="type_name"
                            :width="110"></a-table-column>
                        <a-table-column :title="$t('problem.problem.5ui17qcgh0w0')" data-index="content" :width="320">
                            <template #cell="{ record }">
                                <ContentEllipsis :content="record.content" > </ContentEllipsis>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('problem.problem.5ui17qcgovs0')" data-index="hit_num" :width="80"
                            :ellipsis="true" :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('problem.problem.5ui17qcgp9s0')" data-index="question_feedback_count"
                            :width="local.lang=='en'?160:120" ></a-table-column>
                        <a-table-column :title="$t('problem.problem.5ui17qcgphc0')" data-index="sort" :width="80"
                            ></a-table-column>
                        <a-table-column :title="$t('problem.problem.5ui17qcgpmg0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column
                            v-if="$permission(['cmsHelpProblemDetail', 'cmsHelpProblemUpdate', 'cmsHelpProblemDelete'])"
                            fixed="right" :title="$t('problem.problem.5ui17qcgpow0')" :width="local.lang=='en'?170:150">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsHelpProblemDetail'])"
                                        @click="router.push({ name: 'cmsHelpProblemDetail', params: { id: record.id } })">{{ $t('problem.problem.5ui17qcgpr00') }}</a-link>
                                    <a-link v-if="$permission(['cmsHelpProblemUpdate'])"
                                        @click="router.push({ name: 'cmsHelpProblemUpdate', params: { id: record.id } })">{{ $t('problem.problem.5ui17qcgptc0') }}</a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0') ">
                                        <a-link v-if="$permission(['cmsHelpProblemDelete'])"
                                            status="danger">{{ $t('problem.problem.5ui17qcgpwg0') }}</a-link>
                                    </a-popconfirm>
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
// import { useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        title: '',
        typeId: '',
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
    const { code, data } = await apiCms.cmsHelpQuestionList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
// 所有问题类型列表
const helpQuestionTypeList: any = ref([])
const getCmsHelpQuestionTypeList = async () => {
    const { code, data } = await apiCms.cmsHelpQuestionTypeList({})
    if (code != 1) return;
    helpQuestionTypeList.value = data.list
}
// 删除
const deleteBtn = async (val: any) => {
    const { code } = await apiCms.cmsHelpQuestionDelete({ 'questionIds': [val.id] })
    if (code != 1) return;
    getData();
}
{
    getData()
    getCmsHelpQuestionTypeList()
}
</script>
<style scoped>
:deep(.arco-typography) {
    margin-bottom: 0;
}
</style>
