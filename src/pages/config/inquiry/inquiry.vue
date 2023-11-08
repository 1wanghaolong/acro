<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <p style="background-color:#dce9fd;color: #219bf7;padding: 15px;border-radius: 5px;margin: 15px 0;">
                {{$t('inquiry.inquiry.5um4pcf2bvk0')}}
            </p>
            <div class="buttonBox">
                <a-space :size="18">
                    <a-button v-permission="['wealthPageSettingCreate']" @click="editVisible = true, statusVisible = 1,form.link_path=''" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('inquiry.inquiry.5um4pcf2le80')}}
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
                        <a-table-column :title="$t('inquiry.inquiry.5um4pcf2lqc0')" data-index="file_name"></a-table-column>

                        <a-table-column :title="$t('inquiry.inquiry.5um4pcf2lzw0')">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('config.inquiry.type', record.type) }}</div>
                            </template>

                        </a-table-column>
                        <a-table-column :title="$t('inquiry.inquiry.5um4pcf2m7w0')">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column v-if="$permission(['wealthPageSettingUpdate','wealthPageSettingDelete'])" fixed="right" :title="$t('inquiry.inquiry.5um4pcf2mkg0')" :width="local.lang=='en'?190:150">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['wealthPageSettingUpdate']" @click="editBtn(record)">{{$t('inquiry.inquiry.5um4pcf2n200')}}</a-link>
                                    <a-link @click="toPath(record)" v-if="record.type == 1">{{$t('inquiry.inquiry.5um4pcf2nbk0')}}</a-link>
                                    <a-link v-else @click="toPath(record)">{{$t('inquiry.inquiry.5um4pcf2nhk0')}}</a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0')">
                                        <a-link  v-permission="['wealthPageSettingDelete']" status="danger">{{$t('inquiry.inquiry.5um4pcf2nn40')}}</a-link>
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
        <a-modal :mask-closable=false v-model:visible="editVisible" :on-before-ok="handleEdit" @close="onCloseEdit">
            <template #title>
                {{ statusVisible == 1 ? $t('inquiry.inquiry.5um4pcf2o6c0') : $t('inquiry.inquiry.5um4pcf2ok00') }}
            </template>
            <div style="display: flex;">
                <a-form ref="formRef" :model="form" layout="vertical">
                    <a-form-item  field="type" :label="$t('inquiry.inquiry.5um4pcf2lzw0')" :rules="[{ required: true, message: $t('inquiry.inquiry.5um4pcf2p4w0') }]"
                        :validate-trigger="['change', 'input']">
                        <a-select :disabled="statusVisible==2" allow-clear v-model="form.type" :placeholder="$t('inquiry.inquiry.5um4pcf2oqg0')">
                            <a-option v-for="item in useEnums('config.inquiry.type')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item v-if="form.type == 1" field="link_path" :label="$t('inquiry.inquiry.5um4pcf2ow00')"
                        :rules="[{ required: true, message: $t('inquiry.inquiry.5um4pcf2p4w0') }]" :validate-trigger="['change', 'input']">
                        <a-input v-model="form.link_path" :placeholder="$t('inquiry.inquiry.5um4pcf2pe80')" />
                    </a-form-item>
                    <a-form-item v-else field="link_path" :label="$t('inquiry.inquiry.5um4pcf2pjc0')" :rules="[{ required: true, message: $t('inquiry.inquiry.5um4pcf2p4w0') }]"
                        :validate-trigger="['change', 'input']">
                        <a-upload @before-upload="beforeUpload" :limit="1" image-preview :auto-upload="true" v-model:file-list="form.link_path"
                            :custom-request="(upload as any)">
                        </a-upload>
                    </a-form-item>
                    <a-form-item field="nameZh" :label="$t('inquiry.inquiry.5um4pcf2prg0')" :rules="[{ required: true, message: $t('inquiry.inquiry.5um4pcf2p4w0') }]"
                        :validate-trigger="['change', 'input']">
                        <a-input v-model="form.nameZh" :placeholder="$t('inquiry.inquiry.5um4pcf2pe80')" />
                    </a-form-item>
                    <a-form-item field="nameEn" :label="$t('inquiry.inquiry.5um4pcf2pwk0')" :rules="[{ required: true, message: $t('inquiry.inquiry.5um4pcf2p4w0') }]"
                        :validate-trigger="['change', 'input']">
                        <a-input v-model="form.nameEn" :placeholder="$t('inquiry.inquiry.5um4pcf2pe80')" />
                    </a-form-item>
                    <a-form-item field="nameTc" :label="$t('inquiry.inquiry.5um4pcf2q1s0')" :rules="[{ required: true, message: $t('inquiry.inquiry.5um4pcf2p4w0') }]"
                        :validate-trigger="['change', 'input']">
                        <a-input v-model="form.nameTc" :placeholder="$t('inquiry.inquiry.5um4pcf2pe80')" />
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { useEnums, useEnumsFormat } from '@/hooks/enums'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
// import { apiWealthCounterpartiesList, apiWealthCounterpartiesCreate,apiWealthCounterpartiesInfo,apiWealthCounterpartiesUpdate } from '@/api'
const searchInfo = reactive({
    show: false,
    data: {
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
    const { code, data } = await apiWealth.apiWealthPageSettingList({
        ...useFilter(searchInfo.data)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const getWealthCounterpartiesInfo = async (id: any) => {
    const { code, data } = await apiWealth.apiWealthPageSettingInfo({ id: id });
    if (code != 1) return;
    return data
}
// 编辑新增
const formRef: any = ref(null)
const statusVisible = ref(1)
const linkPath = ref()
const form: any = ref({
    type: 1,
    nameZh: '',
    nameTc: '',
    nameEn: '',
    link_path: '',
    id: ''
})
const editVisible = ref(false)
const editVisibleName = ref(t('inquiry.inquiry.5um4pcf2o6c0'))
const handleEdit = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
        if (statusVisible.value == 1) {
            const res: any = await apiWealth.apiWealthPageSettingCreate({
                data: {
                    type: form.value.type,
                    link_path: form.value.type == 1 ? form.value.link_path : form.value.link_path[0].response.url,
                    file_name: {
                        'zh-CN': form.value.nameZh,
                        'tc': form.value.nameTc,
                        'en': form.value.nameEn,
                    }
                }
            });
            if (res.code != 1) return;
            Message.success({
                content: t('inquiry.inquiry.5um4pcf2qac0'),
            })
            form.value.link_path = ''
            getData();

            return true
        } else {
            const res: any = await apiWealth.apiWealthPageSettingUpdate({
                id: form.value.id,
                data: {
                    type: form.value.type,
                    link_path:form.value.type == 1 ? form.value.link_path:linkPath.value,
                    file_name: {
                        'zh-CN': form.value.nameZh,
                        'tc': form.value.nameTc,
                        'en': form.value.nameEn,
                    }
                }
            });
            if (res.code != 1) return;
            Message.success({
                content: t('inquiry.inquiry.5um4pcf2qdo0'),
            })
            form.value.link_path = ''
            getData();
            return true
        }

    }
    return false
}
const editBtn = async (val: any) => {
    let obj = await getWealthCounterpartiesInfo(val.id)
    form.value.nameZh = obj.file_name['zh-CN']
    form.value.nameTc = obj.file_name['tc']
    form.value.nameEn = obj.file_name['en']
    form.value.id = val.id
    form.value.type = val.type
    if(val.type==1){
        form.value.link_path= obj.link_path
    }else{
        let arr = obj.link_path.split('.')
        form.value.link_path = [{
          uid: '1',
          name: obj.file_name[local.lang]+'.'+arr[arr?.length-1]||'pdf',
          url: obj.link_path,
        }]
    }
    
    linkPath.value = obj.link_path
    editVisibleName.value = t('inquiry.inquiry.5um4pcf2ok00')
    statusVisible.value = 2
    editVisible.value = true
}
const onCloseEdit = () => {
    form.value.link_path = ''
    formRef.value.resetFields()
}
const toPath = async (record: any) => {
    if (record.type == 1) {
        const fileURL = record.link_path; // PDF文件的URL
        const link = document.createElement('a');
        link.href = fileURL;
        link.target = '_blank';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        const fileURL = record.link_path; // PDF文件的URL
        const fileName = record.file_name // 下载的文件名
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
const upload = async (option: any) => {
    const { onError, onSuccess, fileItem } = option
    const formData = new FormData()
    formData.append('file', fileItem.file)
    const { code, data } = await apiSystem.upload(formData)
    if (code != 1) return onError();
    linkPath.value = data.url
    onSuccess(data);
}
const beforeUpload = (file:any):any => {
    const allowedTypes = [ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/pdf'];
    return new Promise<boolean | File>((resolve, reject) => {
        if (allowedTypes.includes(file.type)) {
            resolve(true)
        } else {
            Message.info(t('inquiry.inquiry.5um4pcf2ql00'))
            reject('cancel')
        }
    });
    };
// 删除
const deleteBtn = async (val: any) => {
  const res: any = await apiWealth.apiWealthPageSettingDelete({
    id: val.id,
  });
  if (res.code != 1) return
  getData();
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

:deep(.arco-select-view-disabled) {
    -webkit-text-fill-color: var(--color-text-1);
}</style>