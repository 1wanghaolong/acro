<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="name" :label="$t('role.role.5um3kpqsiek0')">
                                <a-input v-model="searchInfo.data.name" :placeholder="$t('role.role.5um3kpqstk40')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="description" :label="$t('role.role.5um3kpqstuo0')">
                                <a-input v-model="searchInfo.data.description" :placeholder="$t('role.role.5um3kpqstk40')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('role.role.5um3kpqsu000')">
                                <a-range-picker v-model="searchInfo.data.create_time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('role.role.5um3kpqsu4g0') : $t('role.role.5um3kpqsup80') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('role.role.5um3kpqsv3k0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('role.role.5um3kpqsva00')}}
                    </a-button>
                </a-space>
                <a-space :size="18" v-permission="['systemRoleCreate']">
                    <a-button @click="createInfo.show = true" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('role.role.5um3kpqsve80')}}
                    </a-button>
                </a-space>
            </div>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small" :data="tableData.list"
                    class="table">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('role.role.5um3kpqsiek0')" data-index="name"></a-table-column>
                        <a-table-column :title="$t('role.role.5um3kpqstuo0')" data-index="description"></a-table-column>
                        <a-table-column :title="$t('role.role.5um3kpqsu000')" data-index="create_time">
                            <template #cell="{ record }">
                                {{ Number(record.create_time) ? dayjs.unix(record.create_time).format('YYYY-MM-DD HH:mm:ss'):' - ' }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('role.role.5um3kpqsvig0')" :width="120" v-if="$permission(['systemAuthUpdate', 'systemAuthDelete'])">
                            <template #cell="{ record }">
                                <a-space v-if="record.is_super_role != 1">
                                    <a-link v-permission="['systemAuthUpdate']" @click="showUpdate(record)">{{$t('role.role.5um3kpqsvms0')}}</a-link>
                                    <a-popconfirm position="left" @ok="del(record)" :content="$t('user.user.5um3j360ghg0')">
                                        <a-link v-permission="['systemAuthDelete']" status="danger">{{$t('role.role.5um3kpqsvtc0')}}</a-link>
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
            <!-- 新增 -->
            <a-modal draggable v-model:visible="createInfo.show" :title="$t('role.role.5um3kpqsve80')" @cancel="createInfo.show = false"
                @before-ok="create">
                <a-form ref="createFormRef" :model="createInfo.data" layout="vertical">
                    <a-form-item field="name" :label="$t('role.role.5um3kpqsiek0')" :rules="[{ required: true, message: $t('role.role.5um3kpqsvzw0') }]">
                        <a-input v-model="createInfo.data.name" :placeholder="$t('role.role.5um3kpqsvzw0')" />
                    </a-form-item>
                    <a-form-item field="description" :label="$t('role.role.5um3kpqstuo0')">
                        <a-input v-model="createInfo.data.description" :placeholder="$t('role.role.5um3kpqsw5c0')" />
                    </a-form-item>
                    <a-form-item field="permissions" hide-label>
                        <div style="width: 100%;overflow: auto;height: 300px;">
                            <div style="display: flex;justify-content: space-between;margin-bottom: 10px;">
                                <div>{{$t('role.role.5um3kpqsw8w0')}}</div>
                                <a-button-group size="mini" style="margin-bottom: 20px;">
                                    <a-button type="primary" @click="toggleChecked">
                                        {{
                                            createInfo.checked?.length ? $t('role.role.5um3kpqswhs0') : $t('role.role.5um3kpqswnk0')
                                        }}
                                    </a-button>
                                </a-button-group>
                                <!-- <a-checkbox
                                        v-model="checkStrictly"
                                        @change="() => {
                                            createInfo.data.permissions = [];
                                        }"
                                    >
                                        {{$t('role.role.5um3kpqswsg0')}}
                                    </a-checkbox> -->
                            </div>
                            <a-tree :checkable="true" :check-strictly="checkStrictly" checked-strategy="all" :data="auths"
                                :default-expand-all="true" v-model:checked-keys="createInfo.checked"
                                v-model:half-checked-keys="createInfo.halfChecked" :fieldNames="{
                                    key: 'id',
                                    title: 'name',
                                    children: 'children'
                                }">
                                <template #title="node">
                                    <a-tag :color="node.is_display == 1 ? 'orange' : 'arcoblue'">{{ node.name }}</a-tag>
                                </template>
                            </a-tree>
                        </div>
                    </a-form-item>
                </a-form>
            </a-modal>
            <!-- 编辑 -->
            <a-modal draggable v-model:visible="updateInfo.show" :title="$t('role.role.5um3kpqsvms0')" @cancel="updateInfo.show = false"
                @before-ok="update">
                <a-form ref="updateFormRef" :model="updateInfo.data" layout="vertical">
                    <a-form-item field="name" :label="$t('role.role.5um3kpqsiek0')" :rules="[{ required: true, message: $t('role.role.5um3kpqsvzw0') }]">
                        <a-input v-model="updateInfo.data.name" :placeholder="$t('role.role.5um3kpqsvzw0')" />
                    </a-form-item>
                    <a-form-item field="description" :label="$t('role.role.5um3kpqstuo0')">
                        <a-input v-model="updateInfo.data.description" :placeholder="$t('role.role.5um3kpqsw5c0')" />
                    </a-form-item>
                    <a-form-item field="permissions" hide-label>
                        <div style="width: 100%;overflow: auto;height: 300px;">
                            <div style="display: flex;justify-content: space-between;margin-bottom: 10px;">
                                <div>{{$t('role.role.5um3kpqsw8w0')}}</div>
                                <!-- <a-checkbox
                                        v-model="checkStrictly"
                                        @change="() => {
                                            updateInfo.data.permissions = [];
                                        }"
                                    >
                                        {{$t('role.role.5um3kpqswsg0')}}
                                    </a-checkbox> -->
                                <a-button-group size="mini" style="margin-bottom: 20px;">
                                    <a-button type="primary" @click="toggleCheckedUpdate">
                                        {{
                                            updateInfo.checked?.length ? $t('role.role.5um3kpqswhs0') : $t('role.role.5um3kpqswnk0')
                                        }}
                                    </a-button>
                                </a-button-group>
                            </div>
                            <a-tree :height="300" :checkable="true" :check-strictly="checkStrictly" checked-strategy="all"
                                :data="auths" :default-expand-all="true" v-model:checked-keys="updateInfo.checked"
                                v-model:half-checked-keys="updateInfo.halfChecked" :fieldNames="{
                                    key: 'id',
                                    title: 'name',
                                    children: 'children'
                                }">
                                <template #title="node">
                                    <a-tag :color="node.is_display == 1 ? 'orange' : 'arcoblue'">{{ node.name }}</a-tag>
                                </template>
                            </a-tree>
                        </div>
                    </a-form-item>
                </a-form>
            </a-modal>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash'
import { useCheckedFormat, useTreeAllId } from '@/hooks/tree'
const searchFormRef = ref()
const createFormRef = ref()
const updateFormRef = ref()
const allAuthKeys = ref([])
const local = useLocal()
const checkStrictly = ref(false)
const searchInfo = reactive({
    show: false,
    data: {
        name: '',
        description: '',
        create_time: [],
        page: 1,
        per_page: 20
    }
})
const filterAuths = (authList: any) => {
    const filteredAuth = authList?.map((auth: any) => {
        auth.name = auth.title[local.lang]
        auth.menuIcon = auth.icon;
        delete auth.icon
        if (auth?.children?.length) {
            auth.children = filterAuths(auth.children);
        }
        return auth
    })
    return filteredAuth
}
const auths = computed(() => {
    return filterAuths(cloneDeep(tableData.auths))
})
const tableData = reactive({
    list: [],
    auths: [],
    count: 0,
    loading: false
})
const createInfo = reactive({
    show: false,
    loading: false,
    checked: [],
    halfChecked: [],
    data: {
        permissions: '',
        name: '',
        description: ''
    }
})
const updateInfo: any = reactive({
    show: false,
    loading: false,
    checked: [],
    halfChecked: [],
    data: {
        id: '',
        permissions: '',
        name: '',
        description: ''
    }
})
const toggleChecked = () => {
    createInfo.checked = createInfo.checked?.length ? [] : cloneDeep(allAuthKeys.value)
    createInfo.halfChecked = []
}
const toggleCheckedUpdate = () => {
    updateInfo.checked = updateInfo.checked?.length ? [] : cloneDeep(allAuthKeys.value)
    updateInfo.halfChecked = []
}
const create = async () => {
    const validate = await createFormRef.value?.validate()
    if (validate) return false;
    createInfo.loading = true
    const { code, msg } = await apiAdmin.roleCreate({
        data: {
            ...createInfo.data,
            permissions: [...createInfo.checked, ...createInfo.halfChecked].join()
        }
    })
    createInfo.loading = false
    if (code != 1) return false;
    Message.success({ content: msg })
    createFormRef.value?.resetFields()
    createInfo.show = false
    getData()
}
const update = async () => {
    const validate = await updateFormRef.value?.validate()
    if (validate) return false;
    updateInfo.loading = true
    const { code, msg } = await apiAdmin.roleUpdate({
        id: updateInfo.data.id,
        data: {
            ...updateInfo.data,
            permissions: [...updateInfo.checked, ...updateInfo.halfChecked].join()
        }
    })
    updateInfo.loading = false
    if (code != 1) return false;
    Message.success({ content: msg })
    updateFormRef.value?.resetFields()
    updateInfo.show = false
    getData()
}
const del = async (record: any) => {
    const { code, msg } = await apiAdmin.roleDelete({
        id: [record.id],
    })
    if (code != 1) return;
    Message.success({ content: msg })
    getData()
}
const showUpdate = (record: any) => {
    updateInfo.data = cloneDeep(record);
    const { checked, halfChecked } = useCheckedFormat(auths.value, record.permissions.split(',')?.map((item: string) => Number(item)))
    updateInfo.checked = checked
    updateInfo.halfChecked = halfChecked
    updateInfo.show = true
}
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiAdmin.roleList(useFilter(searchInfo.data))
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data.list || []
    tableData.count = data.count
}
const getAuths = async () => {
    tableData.loading = true
    const { code, data } = await apiAdmin.authList()
    tableData.loading = false
    if (code != 1) return;
    tableData.auths = data?.length ? data : []
    allAuthKeys.value = useTreeAllId(tableData.auths)
}
{
    getData()
    getAuths()
}

</script>