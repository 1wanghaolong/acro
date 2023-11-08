<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="nickname" :label="$t('user.user.5um3ibzt1f40')">
                                <a-input v-model="searchInfo.data.nickname" :placeholder="$t('user.user.5um3ibzt39s0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="username" :label="$t('user.user.5um3ibzt4000')">
                                <a-input v-model="searchInfo.data.username" :placeholder="$t('user.user.5um3ibzt39s0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('user.user.5um3ibzt4as0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('user.user.5um3ibzt4hs0')">
                                    <a-option v-for="item in useEnums('system.user.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('user.user.5um3ibzt4o00')">
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
                        {{ searchInfo.show ? $t('user.user.5um3ibzt4uc0') : $t('user.user.5um3ibzt5000') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('user.user.5um3ibzt5540')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('user.user.5um3ibzt5a40')}}
                    </a-button>
                </a-space>
                <a-space :size="18" v-permission="['systemUserCreate']">
                    <a-button @click="createInfo.show = true" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('user.user.5um3ibzt5sk0')}}
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
                        <a-table-column :title="$t('user.user.5um3ibzt63s0')" data-index="avatar">
                            <template #cell="{ record }">
                                <a-image width="40" :src="record.avatar || avatar" />
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('user.user.5um3ibzt1f40')" data-index="nickname"></a-table-column>
                        <a-table-column :title="$t('user.user.5um3ibzt4000')" data-index="username"></a-table-column>
                        <a-table-column :title="$t('user.user.5um3ibzt69g0')" data-index="role_id_list">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-tag size="small" color="arcoblue" v-for="item in record.role_list">{{ item.name
                                    }}</a-tag>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('user.user.5um3ibzt4as0')" :width="70" v-if="$permission(['systemUserUpdate'])">
                            <template #cell="{ record }">
                                <a-switch @change="changeStatus(record)" size="small" :checked-value="1"
                                    :unchecked-value="0" v-model="record.status" />
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('user.user.5um3ibzt4o00')" data-index="create_time">
                            <template #cell="{ record }">
                                {{ Number(record.create_time) ? dayjs.unix(record.create_time).format('YYYY-MM-DD HH:mm:ss'):' - ' }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('user.user.5um3ibzt6eg0')" :width="120" v-if="$permission(['systemUserUpdate', 'systemUserDelete'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['systemUserUpdate']" @click="showUpdate(record)">{{$t('user.user.5um3ibzt6is0')}}</a-link>
                                    <a-popconfirm v-if="record.is_super_admin != 1" position="left" @ok="del(record)"
                                        :content="$t('user.user.5um3j360ghg0')">
                                        <a-link v-permission="['systemUserDelete']" status="danger">{{$t('user.user.5um3ibzt6n80')}}</a-link>
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
            <a-modal draggable v-model:visible="createInfo.show" :title="$t('user.user.5um3ibzt5sk0')" @cancel="createInfo.show = false"
                @before-ok="create">
                <a-form ref="createFormRef" :model="createInfo.data" layout="vertical">
                    <a-form-item field="nickname" :label="$t('user.user.5um3ibzt63s0')">
                        <a-upload :limit="1" list-type="picture-card" image-preview :auto-upload="true"
                            v-model:file-list="fileList" :custom-request="(upload as any)">
                        </a-upload>
                    </a-form-item>
                    <a-form-item field="nickname" :label="$t('user.user.5um3ibzt1f40')" :rules="[{ required: true, message: $t('user.user.5um3ibzt6s00') }]">
                        <a-input v-model="createInfo.data.nickname" :placeholder="$t('user.user.5um3ibzt6s00')" />
                    </a-form-item>
                    <a-form-item field="username" :label="$t('user.user.5um3ibzt4000')" :rules="[{ required: true, message: $t('user.user.5um3ibzt6wc0') }]">
                        <a-input v-model="createInfo.data.username" :placeholder="$t('user.user.5um3ibzt6wc0')" />
                    </a-form-item>
                    <a-form-item field="password" :label="$t('user.user.5um3ibzt7100')" :rules="[{ required: true, message: $t('user.user.5um3ibzt76w0') }]">
                        <a-input-password v-model="createInfo.data.password" :placeholder="$t('user.user.5um3ibzt76w0')" />
                    </a-form-item>
                    <a-form-item field="role_id_list" :label="$t('user.user.5um3ibzt69g0')"
                        :rules="[{ required: true, type: 'array', message: $t('user.user.5um3ibzt7ck0') }]">
                        <a-select v-model="createInfo.data.role_id_list" :placeholder="$t('user.user.5um3ibzt7ck0')" multiple>
                            <a-option v-for="item in tableData.roles" :value="item.id">{{ item.name }}</a-option>
                        </a-select>
                    </a-form-item>
                </a-form>
            </a-modal>
            <!-- 编辑 -->
            <a-modal draggable v-model:visible="updateInfo.show" :title="$t('user.user.5um3ibzt6is0')" @cancel="updateInfo.show = false"
                @before-ok="update">
                <a-form ref="updateFormRef" :model="updateInfo.data" layout="vertical">
                    <a-form-item field="nickname" :label="$t('user.user.5um3ibzt63s0')">
                        <a-upload :limit="1" list-type="picture-card" image-preview :auto-upload="true"
                            v-model:file-list="fileList" :custom-request="(upload as any)">
                        </a-upload>
                    </a-form-item>
                    <a-form-item field="nickname" :label="$t('user.user.5um3ibzt1f40')" :rules="[{ required: true, message: $t('user.user.5um3ibzt6s00') }]">
                        <a-input v-model="updateInfo.data.nickname" :placeholder="$t('user.user.5um3ibzt6s00')" />
                    </a-form-item>
                    <a-form-item field="username" :label="$t('user.user.5um3ibzt4000')" :rules="[{ required: true, message: $t('user.user.5um3ibzt6wc0') }]">
                        <a-input v-model="updateInfo.data.username" :placeholder="$t('user.user.5um3ibzt6wc0')" />
                    </a-form-item>
                    <a-form-item field="role_id_list" :label="$t('user.user.5um3ibzt69g0')"
                        :rules="[{ required: true, type: 'array', message: $t('user.user.5um3ibzt7ck0') }]">
                        <a-select v-model="updateInfo.data.role_id_list" :placeholder="$t('user.user.5um3ibzt7ck0')" multiple>
                            <a-option v-for="item in tableData.roles" :value="item.id">{{ item.name }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="password" :label="$t('user.user.5um3ibzt7100')">
                        <a-input-password v-model="updateInfo.data.password" :placeholder="$t('user.user.5um3ibzt7g00')" />
                    </a-form-item>
                </a-form>
            </a-modal>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash'
import avatar from '@/assets/img/avatar.png'
import { useEnums } from '@/hooks/enums'
const searchFormRef = ref()
const tableRef = ref()
const local = useLocal()
const createFormRef = ref()
const updateFormRef = ref()
const fileList: any = ref([])
const searchInfo = reactive({
    show: false,
    data: {
        nickname: '',
        username: '',
        status: '',
        create_time: [],
        page: 1,
        per_page: 20
    }
})
const tableData: any = reactive({
    list: [],
    roles: [],
    count: 0,
    loading: false
})
const createInfo = reactive({
    show: false,
    loading: false,
    data: {
        username: '',
        password: '',
        nickname: '',
        avatar: '',
        role_id_list: []
    }
})
const updateInfo: any = reactive({
    show: false,
    loading: false,
    data: {
        id: '',
        username: '',
        password: '',
        nickname: '',
        avatar: '',
        role_id_list: []
    }
})
const create = async () => {
    const validate = await createFormRef.value?.validate()
    if (validate) return false;
    createInfo.loading = true
    const { code, msg } = await apiAdmin.userCreate({
        data: {
            ...createInfo.data,
            avatar: fileList.value?.[0]?.response?.url || ''
        }
    })
    createInfo.loading = false
    if (code != 1) return false;
    Message.success({ content: msg })
    createFormRef.value?.resetFields()
    createInfo.show = false
    fileList.value = []
    getData()
}
// 编辑状态
const changeStatus = async (record: any) => {
    const { code, msg } = await apiAdmin.userUpdate({
        id: record.id,
        data: {
            ...record,
            role_id_list: record.role_user_list.map((item: any) => item.role_id)
        }
    })
    if (code != 1) return getData();
    Message.success({ content: msg })
}
const update = async () => {
    const validate = await updateFormRef.value?.validate()
    if (validate) return false;
    updateInfo.loading = true
    const { code, msg } = await apiAdmin.userUpdate({
        id: updateInfo.data.id,
        data: {
            ...updateInfo.data,
            avatar: fileList.value?.[0]?.response?.url || fileList.value?.[0]?.url || '',
            password: updateInfo.data.password
        }
    })
    updateInfo.loading = false
    if (code != 1) return false;
    Message.success({ content: msg })
    updateFormRef.value?.resetFields()
    updateInfo.show = false
    fileList.value = []
    getData()
}
const del = async (record: any) => {
    const { code, msg } = await apiAdmin.userDelete({
        id: [record.id],
    })
    if (code != 1) return;
    Message.success({ content: msg })
    getData()
}
const upload = async (option: any) => {
    const { onError, onSuccess, fileItem } = option
    const formData = new FormData()
    formData.append('file', fileItem.file)
    const { code, data } = await apiSystem.upload(formData)
    if (code != 1) return onError();
    onSuccess(data);
}
const showUpdate = (record: any) => {
    updateInfo.data = cloneDeep(record);
    updateInfo.data.role_id_list = record.role_user_list.map((item: any) => item.role_id)
    if (updateInfo.data.avatar) {
        fileList.value = [{
            url: updateInfo.data.avatar
        }]
    }
    updateInfo.show = true
}
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiAdmin.userList(useFilter({
        ...searchInfo.data,
        status: searchInfo.data.status !== '' ? searchInfo.data.status : null
    }))
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data.list || []
    tableData.count = data.count
    nextTick(() => {
        tableRef.value?.expandAll()
    })
}
const getRoles = async () => {
    tableData.loading = true
    const { code, data } = await apiAdmin.roleAllList()
    tableData.loading = false
    if (code != 1) return;
    tableData.roles = data || []
}
{
    getData()
    getRoles()
}

</script>