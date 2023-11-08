<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard" :title="$t(`router.${String(route.name)}`)">
            <div class="tableBox">
                <a-table ref="tableRef" hide-expand-button-on-empty :data="tableData.list" :bordered="false"
                    column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small" class="table"
                    row-key="id">
                    <template #expand-icon="{ expanded }">
                        <IconUp v-if="expanded" />
                        <IconDown v-else />
                    </template>
                    <template #columns>
                        <a-table-column :title="$t('auth.auth.5um3ll6tfc40')" :width="local.lang=='en'?270:300">
                            <template #cell="{ record }">
                                {{ record?.title?.[local.lang] }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('auth.auth.5um3ll6thd00')" :width="80">
                            <template #cell="{ record }">
                                <a-icon v-if="record.icon">
                                    <svg><use :href="`#${record.icon}`"></use></svg>
                                </a-icon>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('auth.auth.5um3ll6thqo0')" :width="local.lang=='en'?100:80">
                            <template #cell="{ record }">
                                <a-tag color="orange" v-if="record?.is_display == 1">{{$t('auth.auth.5um3ll6thz00')}}</a-tag>
                                <a-tag color="arcoblue" v-else>{{$t('auth.auth.5um3ll6tiu00')}}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('auth.auth.5um3ll6tj480')" data-index="url" :width="200"></a-table-column>
                        <a-table-column :title="$t('auth.auth.5um3ll6tj8s0')" data-index="path" :width="200"></a-table-column>
                        <a-table-column :title="$t('auth.auth.5um3ll6tjf00')" data-index="method" :width="local.lang=='en'?150:90">
                            <template #cell="{ record }">
                                <a-tag v-if="record?.method">{{ record.method }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('auth.auth.5um3ll6tjlc0')" data-index="sort" :width="80"></a-table-column>
                        <a-table-column :title="$t('auth.auth.5um3ll6tk200')" :width="160" fixed="right" v-if="$permission(['systemAuthCreate','systemAuthUpdate','systemAuthDelete'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['systemAuthCreate']"
                                        @click="createInfo.data.parent_id = record.id; createInfo.show = true">{{$t('auth.auth.5um3ll6tk9c0')}}</a-link>
                                    <a-link v-permission="['systemAuthUpdate']" @click="updateInfo.data = cloneDeep(record); updateInfo.show = true"
                                        v-if="record.id">{{$t('auth.auth.5um3ll6tkfw0')}}</a-link>
                                    <a-popconfirm position="left" @ok="del(record)" :content="$t('problem.problem.5ukdvvdbjrg0')">
                                        <a-link v-permission="['systemAuthDelete']" v-if="record.id" status="danger">{{$t('auth.auth.5um3ll6tkn40')}}</a-link>
                                    </a-popconfirm>
                                </a-space>
                            </template>
                        </a-table-column>
                        <!-- <a-table-column title="操作" :width="160" fixed="right" v-permission="['systemAuthCreate','systemAuthUpdate','systemAuthDelete']">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['systemAuthCreate']"
                                        @click="createInfo.data.parent_id = record.id; createInfo.show = true">{{$t('auth.auth.5um3ll6tk9c0')}}</a-link>
                                    <a-link v-permission="['systemAuthUpdate']" @click="updateInfo.data = cloneDeep(record); updateInfo.show = true"
                                        v-if="record.id">{{$t('auth.auth.5um3ll6tkfw0')}}</a-link>
                                    <a-popconfirm position="left" @ok="del(record)" content="您确认要删除吗? ">
                                        <a-link v-permission="['systemAuthDelete']" v-if="record.id" status="danger">{{$t('auth.auth.5um3ll6tkn40')}}</a-link>
                                    </a-popconfirm>
                                </a-space>
                            </template>
                        </a-table-column> -->
                    </template>
                </a-table>
            </div>
            <!-- 新增 -->
            <a-modal draggable v-model:visible="createInfo.show" :title="$t('auth.auth.5um3ll6tk9c0')" @cancel="createInfo.show = false"
                @before-ok="create">
                <a-form ref="createFormRef" :model="createInfo.data" layout="vertical">
                    <a-form-item field="parent_id" :label="$t('auth.auth.5um3ll6tkt80')">
                        <a-tree-select :fieldNames="{
                            key: 'id',
                            title: 'name',
                            children: 'children'
                        }" :data="auths" :placeholder="$t('auth.auth.5um3ll6tkxw0')" :fallback-option="false"
                            v-model="createInfo.data.parent_id">
                        </a-tree-select>
                    </a-form-item>
                    <a-form-item field="is_display" :label="$t('auth.auth.5um3ll6thqo0')">
                        <a-radio-group v-model="createInfo.data.is_display">
                            <a-radio :value="1">{{$t('auth.auth.5um3ll6thz00')}}</a-radio>
                            <a-radio :value="0">{{$t('auth.auth.5um3ll6tiu00')}}</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-row :gutter="16">
                        <a-col :xl="8">
                            <a-form-item field="title.zh-CN" :label="$t('auth.auth.5um3ll6tl3o0')" :rules="[{ required: true, message: '请输入名称' }]">
                                <a-input v-model="createInfo.data.title['zh-CN']" :placeholder="$t('auth.auth.5um3ll6tl9s0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xl="8">
                            <a-form-item field="title.en" :label="$t('auth.auth.5um3ll6tlto0')" :rules="[{ required: true, message: '请输入名称' }]">
                                <a-input v-model="createInfo.data.title.en" :placeholder="$t('auth.auth.5um3ll6tm180')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xl="8">
                            <a-form-item field="title.tc" :label="$t('auth.auth.5um3ll6tm780')" :rules="[{ required: true, message: '请输入名称' }]">
                                <a-input v-model="createInfo.data.title.tc" :placeholder="$t('auth.auth.5um3ll6tmfg0')" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-form-item field="icon" hide-label :content-flex="false">
                        <div style="width: 100%;padding: 5px 0;display: flex;align-items: center;">
                            <div>{{$t('auth.auth.5um3ll6thd00')}}</div>
                            <a-icon style="margin-left: 10px;color: rgb(var(--arcoblue-6));">
                                <svg><use :href="`#${createInfo.data.icon}`"></use></svg>
                            </a-icon>
                        </div>
                        <div class="iconList">
                            <div class="iconItem" @click="createInfo.data.icon = (createInfo.data.icon == item ? '' : item )" :class="{active: createInfo.data.icon == item}" v-for="item in icons">
                                <a-icon>
                                    <svg><use :href="`#${item}`"></use></svg>
                                </a-icon>
                            </div>
                        </div>
                    </a-form-item>
                    <a-form-item field="url" :label="$t('auth.auth.5um3ll6tj480')" :rules="[{ required: true, message: $t('auth.auth.5um3ll6tmkw0') }]">
                        <a-input v-model="createInfo.data.url" :placeholder="$t('auth.auth.5um3ll6tmkw0')" />
                    </a-form-item>
                    <a-row :gutter="16">
                        <a-col :xl="12">
                            <a-form-item field="path" :label="$t('auth.auth.5um3ll6tj8s0')" :rules="[{ required: true, message: $t('auth.auth.5um3ll6tmro0') }]">
                                <a-input v-model="createInfo.data.path" :placeholder="$t('auth.auth.5um3ll6tmro0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xl="12">
                            <a-form-item field="method" :label="$t('auth.auth.5um3ll6tjf00')">
                                <a-select allow-clear v-model="createInfo.data.method" :placeholder="$t('auth.auth.5um3ll6tmy80')">
                                    <a-option v-for="item in ['GET', 'POST', 'PUT', 'DELETE']" :value="item">{{ item }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-form-item field="sort" :label="$t('auth.auth.5um3ll6tjlc0')">
                        <a-input-number v-model="createInfo.data.sort" :placeholder="$t('auth.auth.5um3ll6tn940')" />
                    </a-form-item>
                    
                </a-form>
            </a-modal>
            <!-- 编辑 -->
            <a-modal draggable v-model:visible="updateInfo.show" :title="$t('auth.auth.5um3ll6tkfw0')" @cancel="updateInfo.show = false"
                @before-ok="update">
                <a-form ref="updateFormRef" :model="updateInfo.data" layout="vertical">
                    <a-form-item field="parent_id" :label="$t('auth.auth.5um3ll6tkt80')">
                        <a-tree-select :fieldNames="{
                            key: 'id',
                            title: 'name',
                            children: 'children'
                        }" :data="auths" :placeholder="$t('auth.auth.5um3ll6tkxw0')" :fallback-option="false"
                            v-model="updateInfo.data.parent_id">
                        </a-tree-select>
                    </a-form-item>
                    <a-form-item field="is_display" :label="$t('auth.auth.5um3ll6thqo0')">
                        <a-radio-group v-model="updateInfo.data.is_display">
                            <a-radio :value="1">{{$t('auth.auth.5um3ll6thz00')}}</a-radio>
                            <a-radio :value="0">{{$t('auth.auth.5um3ll6tiu00')}}</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-row :gutter="16">
                        <a-col :xl="8">
                            <a-form-item field="title.zh-CN" :label="$t('auth.auth.5um3ll6tl3o0')" :rules="[{ required: true, message: '请输入名称' }]">
                                <a-input v-model="updateInfo.data.title['zh-CN']" :placeholder="$t('auth.auth.5um3ll6tl9s0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xl="8">
                            <a-form-item field="title.en" :label="$t('auth.auth.5um3ll6tlto0')" :rules="[{ required: true, message: '请输入名称' }]">
                                <a-input v-model="updateInfo.data.title.en" :placeholder="$t('auth.auth.5um3ll6tm180')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xl="8">
                            <a-form-item field="title.tc" :label="$t('auth.auth.5um3ll6tm780')" :rules="[{ required: true, message: '请输入名称' }]">
                                <a-input v-model="updateInfo.data.title.tc" :placeholder="$t('auth.auth.5um3ll6tmfg0')" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-form-item field="icon" hide-label :content-flex="false">
                        <div style="width: 100%;padding: 5px 0;display: flex;align-items: center;">
                            <div>{{$t('auth.auth.5um3ll6thd00')}}</div>
                            <a-icon style="color: rgb(var(--arcoblue-6));margin-left: 10px;">
                                <svg><use :href="`#${updateInfo.data.icon}`"></use></svg>
                            </a-icon>
                        </div>
                        <div class="iconList">
                            <div class="iconItem" @click="updateInfo.data.icon = (updateInfo.data.icon == item ? '' : item )" :class="{active: updateInfo.data.icon == item}" v-for="item in icons">
                                <a-icon>
                                    <svg><use :href="`#${item}`"></use></svg>
                                </a-icon>
                            </div>
                        </div>
                    </a-form-item>
                    <a-form-item field="url" :label="$t('auth.auth.5um3ll6tj480')" :rules="[{ required: true, message: $t('auth.auth.5um3ll6tmkw0') }]">
                        <a-input v-model="updateInfo.data.url" :placeholder="$t('auth.auth.5um3ll6tmkw0')" />
                    </a-form-item>
                    <a-row :gutter="16">
                        <a-col :xl="12">
                            <a-form-item field="path" :label="$t('auth.auth.5um3ll6tj8s0')" :rules="[{ required: true, message: $t('auth.auth.5um3ll6tmro0') }]">
                                <a-input v-model="updateInfo.data.path" :placeholder="$t('auth.auth.5um3ll6tmro0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xl="12">
                            <a-form-item field="method" :label="$t('auth.auth.5um3ll6tjf00')">
                                <a-select allow-clear v-model="updateInfo.data.method" :placeholder="$t('auth.auth.5um3ll6tmy80')">
                                    <a-option v-for="item in ['GET', 'POST', 'PUT', 'DELETE']" :value="item">{{ item }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-form-item field="sort" :label="$t('auth.auth.5um3ll6tjlc0')">
                        <a-input-number v-model="updateInfo.data.sort" :placeholder="$t('auth.auth.5um3ll6tn940')" />
                    </a-form-item>
                </a-form>
            </a-modal>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash'
import { icons } from '@/utils/icon'
// import { h, compile } from 'vue';
const tableRef = ref()
const createFormRef = ref()
const updateFormRef = ref()
const route = useRoute()
const local = useLocal()
const filterAuths = (authList:any) => {
  const filteredAuth = authList.map((auth:any) => {
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
const auths = computed(()=>{
    return filterAuths(cloneDeep(tableData.list))
})
// const icon = (props: any) => {
//     return (props.name ? h(compile(`<${props.name}/>`)) : null)
// }
const tableData = reactive({
    list: [{
        id: 0,
        parent_id: 0,
        is_display: 1,
        icon:'',
        title: {
            'zh-CN': '根节点',
            'en': 'root',
            'tc': '根節點',
        },
        children: []
    }],
    loading: false
})
const createInfo = reactive({
    show: false,
    loading: false,
    data: {
        method: 'GET',
        path: '',
        url:'',
        is_display: 1,
        sort:100,
        title: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        icon:'',
        parent_id: 0
    }
})
const updateInfo: any = reactive({
    show: false,
    loading: false,
    data: {
        id: '',
        method: '',
        path: '',
        url:'',
        is_display: 1,
        sort:100,
        title: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        icon:'',
        parent_id: 0
    }
})
const create = async () => {
    const validate = await createFormRef.value?.validate()
    if (validate) return false;
    createInfo.loading = true
    const { code, msg } = await apiAdmin.authCreate({
        data: {
            ...createInfo.data
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
    const { code, msg } = await apiAdmin.authUpdate({
        id: updateInfo.data.id,
        data: {
            ...updateInfo.data
        }
    })
    updateInfo.loading = false
    if (code != 1) return false;
    Message.success({ content: msg })
    updateFormRef.value?.resetFields()
    updateInfo.show = false
    getData()
}
// const changeStatus = async (record: any) => {
//     const { code, msg } = await apiAdmin.authUpdate({
//         id: record.id,
//         data: {
//             ...record
//         }
//     })
//     if (code != 1) return getData();
//     Message.success({ content: msg })
// }
const del = async (record: any) => {
    const { code, msg } = await apiAdmin.authDelete({
        id: [record.id],
    })
    if (code != 1) return;
    Message.success({ content: msg })
    getData()
}
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiAdmin.authList()
    tableData.loading = false
    if (code != 1) return;
    tableData.list[0].children = data?.length ? data : []
    nextTick(() => {
        // tableRef.value?.expandAll()
        tableRef.value?.expand(0)
    })
}
{
    getData()
}
</script>

<style lang="less" scoped>
.iconList{
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    height: 100px;
    overflow: auto;
    .iconItem{
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        cursor: pointer;
        &:hover{
            background-color: #f1f1f1;
        }
        &.active{
            border: 1px solid rgb(var(--arcoblue-6));
        }
    }
}
</style>