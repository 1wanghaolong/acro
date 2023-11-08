<template>
  <div class="wrap">
    <Breadcrumb />
    <a-card class="generalCard">
      <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
        <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="agentName" :label="$t('manage.manage.5ulhopyefr40')">
                <a-input v-model="searchInfo.data.agentName" :placeholder="$t('manage.manage.5ulhopyei9w0')" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="userName" :label="$t('manage.manage.5ulhopyeinw0')">
                <a-input v-model="searchInfo.data.userName" :placeholder="$t('manage.manage.5ulhopyei9w0')" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="status" :label="$t('manage.manage.5ulhopyeivk0')">
                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('manage.manage.5ulhopyej1w0')">
                  <a-option v-for="item in useEnums('cms.agent.channel.status')" :value="item.value">{{
                    item.trans[local.lang] }}</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="time" :label="$t('manage.manage.5ulhopyejg80')">
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
            {{ searchInfo.show ? $t('manage.manage.5ulhopyejno0') : $t('manage.manage.5ulhopyeju00') }}
          </a-button>
          <a-button @click="resetBtn">
            <template #icon>
              <icon-refresh />
            </template>
            {{$t('manage.manage.5ulhopyejzw0')}}
          </a-button>
          <a-button @click="getData" type="primary">
            <template #icon>
              <icon-search />
            </template>
            {{$t('manage.manage.5ulhopyek440')}}
          </a-button>
        </a-space>
        <a-space :size="18">
          <a-button v-permission="['cmsAgentManageCreate']" @click="router.push({ name: 'cmsAgentManageCreate' })"
            type="primary">
            <template #icon>
              <icon-plus />
            </template>
            {{$t('manage.manage.5ulhopyekb40')}}
          </a-button>
        </a-space>
      </div>
      <div class="tableBox">
        <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading" :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined
          " size="small" :data="tableData.list" class="table">
          <template #columns>
            <a-table-column title="#" :width="50">
              <template #cell="{ rowIndex }">
                {{ rowIndex + 1 }}
              </template>
            </a-table-column>
            <a-table-column title="ID" data-index="id" :width="80"></a-table-column>
            <a-table-column :title="$t('manage.manage.5ulhopyefr40')" data-index="agent_name" :ellipsis="true" :tooltip="true" :width="160">
            </a-table-column>
            <a-table-column :title="$t('manage.manage.5ulhopyeinw0')" data-index="user_name"  :width="local.lang=='en'?140:100">
            </a-table-column>
            <a-table-column :title="$t('manage.manage.5ulhopyekkc0')" data-index="invite_num"  :width="local.lang=='en'?210:110">
            </a-table-column>
            <a-table-column :title="$t('manage.manage.5ulhopyekog0')" data-index="open_num"  :width="local.lang=='en'?230:110">
            </a-table-column>
            <a-table-column :title="$t('manage.manage.5ulhopyekuo0')" data-index="payment_num"  :width="local.lang=='en'?230:110">
            </a-table-column>
            <a-table-column :title="$t('manage.manage.5ulhopyel280')" data-index="agent_num"  :width="local.lang=='en'?180:80">
            </a-table-column>
            <a-table-column :title="$t('manage.manage.5ulhopyel8k0')" data-index="agent_invite_num"  :width="local.lang=='en'?250:110">
            </a-table-column>
            <a-table-column :title="$t('manage.manage.5ulhopyeldc0')" data-index="agent_open_num"  :width="local.lang=='en'?300:110">
            </a-table-column>
            <a-table-column :title="$t('manage.manage.5ulhopyelhs0')" data-index="agent_payment_num"  :width="local.lang=='en'?250:110">
            </a-table-column>
            <a-table-column :title="$t('manage.manage.5ulhopyeivk0')" :width="100">
              <template #cell="{ record }">
                <span v-if="$permission(['cmsAgentUserTopUpdateStatus'])">
                  <a-switch size="small" v-permission="['cmsAgentUserTopUpdateStatus']"
                    @change="handleChangeIntercept(record)" v-model="record.status" :checked-value="1"
                    :unchecked-value="0">
                  </a-switch>
                </span>
                <span v-else>
                  {{
                    useEnumsFormat("cms.agent.channel.status", record.status)
                  }}
                </span>
              </template>
            </a-table-column>
            <a-table-column :title="$t('manage.manage.5ulhopyejg80')" :width="local.lang=='en'?140:120">
              <template #cell="{ record }">
                <div>
                  {{
                    record.create_time
                    ? dayjs.unix(record.create_time).format("YYYY-MM-DD")
                    : "--"
                  }}
                </div>
                <div>
                  {{
                    record.create_time
                    ? dayjs.unix(record.create_time).format("HH:mm:ss")
                    : "--"
                  }}
                </div>
              </template>
            </a-table-column>
            <a-table-column v-if="$permission([
                  'cmsAgentInvite',
                  'cmsAgentManageUpdate',
                  'cmsAgentChannel',
                  'cmsAgentUserTopResetPassword',
                  'cmsAgentUserCreate',
                ])
                " fixed="right" :title="$t('manage.manage.5ulhopyelnc0')" :width="local.lang=='en'?500:320">
              <template #cell="{ record }">
                <a-space>
                  <a-link v-if="$permission(['cmsAgentManageUpdate'])" @click="
                    router.push({
                      name: 'cmsAgentManageUpdate',
                      params: { id: record.id },
                    })
                    ">{{$t('manage.manage.5ulhopyelsg0')}}</a-link>
                  <a-link v-if="$permission(['cmsAgentChannel'])" @click="
                    router.push({
                      name: 'cmsAgentChannel',
                      query: { id: record.id },
                    })
                    ">{{$t('manage.manage.5ulhopyem0s0')}}</a-link>
                  <a-link v-if="$permission(['cmsAgentInvite'])" @click="
                    router.push({
                      name: 'cmsAgentInvite',
                      query: { id: record.id },
                    })
                    ">{{$t('manage.manage.5ulhopyem4s0')}}</a-link>
                  <a-link v-if="$permission(['cmsAgentUserCreate'])" @click="createBtn(record)">{{$t('manage.manage.5ulhopyemd80')}}</a-link>
                  <a-link @click="savaPassBtn(record)" v-if="$permission(['cmsAgentUserTopResetPassword'])">{{$t('manage.manage.5ulhopyemhk0')}}</a-link>
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </div>
      <div class="pagination">
        <a-pagination size="small" @change="getData" @page-size-change="getData" v-model:current="searchInfo.data.page"
          v-model:page-size="searchInfo.data.per_page" :total="tableData.count" show-total show-jumper show-page-size />
      </div>
    </a-card>
    <a-modal v-model:visible="visible" @ok="handleOk" @cancel="visible = false">
      <template #title> {{$t('manage.manage.5ulhopyemhk0')}} </template>
      <div>
        {{ $t('manage.manage.5ulhopyeml00') }}
        {{
          ` ${dataPass.agent_name}(${dataPass.user_name}) `
        }}
        {{ $t('manage.manage.5ulhopyemo80') }}
      </div>
    </a-modal>
    <a-modal width="600px" :mask-closable="false" v-model:visible="showVisibleCreate" :on-before-ok="handleCreateSubmit"
      @close="onClose">
      <template #title>
        {{ $t('manage.manage.5ulhopyemd80') }}
      </template>
      <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
        <a-row :gutter="16">
          <a-col :xs="24" :sm="12" :md="8" :xl="12">
            <a-form-item field="agent_name" :label="$t('manage.manage.5ulhopyems00')">
              <a-input v-model="form.data.agent_name" :placeholder="$t('manage.manage.5ulhopyemv80')" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="12">
            <a-form-item field="country_code" :label="$t('manage.manage.5ulhopyemzo0')">
              <a-select allow-search allow-clear v-model="form.data.country_code" :placeholder="$t('manage.manage.5ulhopyen1w0')">
                <a-option v-for="item in countryCodeList" :value="item.country_code">
                  {{ item.country_code }} {{ item.name }} {{ item.country_label }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="12">
            <a-form-item field="mobile" :label="$t('manage.manage.5ulhopyen680')">
              <a-input v-model="form.data.mobile" :placeholder="$t('manage.manage.5ulhopyen900')" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="12">
            <a-form-item field="email" :label="$t('manage.manage.5ulhopyencg0')">
              <a-input v-model="form.data.email" :placeholder="$t('manage.manage.5ulhopyenf00')" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="12">
            <a-form-item field="commission_rate" :label="$t('manage.manage.5ulhopyenh40')">
              <a-input-number hide-button v-model="form.data.commission_rate" :placeholder="$t('manage.manage.5ulhopyensc0')">
                <template #prefix> % </template>
              </a-input-number>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="12" v-if="local.config?.agent?.is_show_trs_interest">
            <a-form-item field="trs_interest_rate" :label="$t('manage.manage.5ulhopyenwc0')" v-if="local.config?.agent?.is_show_trs_interest">
              <a-input-number hide-button v-model="form.data.trs_interest_rate" :placeholder="$t('manage.manage.5ulhopyenz40')">
                <template #prefix> % </template>
              </a-input-number>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="12">
            <a-form-item field="toAgentName" :label="$t('manage.manage.5ulhopyeo300')">
              <div style="width: 100%">
                <a-input disabled v-model="form.data.toAgentName" :placeholder="$t('manage.manage.5ulhopyeo7w0')" />
                <p style="margin-top: 10px">
                  {{$t('manage.manage.5ulhopyeoas0')}}
                </p>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat, useEnums } from "@/hooks/enums";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal();
// const route = useRoute()
const router = useRouter();
const searchFormRef = ref();
const searchInfo: any = reactive({
  show: false,
  data: {
    agentName: "",
    userName: "",
    status: "",
    time: [],
    page: 1,
    per_page: 20,
  },
});
const tableData = reactive({
  list: [],
  count: 0,
  message: [],
  loading: false,
});
const getData = async () => {
  tableData.loading = true;
  let param: any = { ...searchInfo.data };
  Object.keys(param).forEach((item: any) => {
    if (!param[item] && param[item] != "0") {
      delete param[item];
    }
  });
  const { code, data } = await apiCms.cmsAgentUserTopList({
    ...useFilter(param),
  });
  tableData.loading = false;
  if (code != 1) return;
  tableData.list = data?.list || [];
  tableData.count = data?.count;
};
const resetBtn = () => {
  searchFormRef.value?.resetFields();
  getData();
};
const validatorData = (value: any, cb: any) => {
  const number = parseFloat(value);
  const decimalStr = number.toString().split(".")[1];
  const num = decimalStr ? decimalStr.length : 0;
  if (value > 100) {
    cb(t('manage.manage.5ulhopyeof40'));
  } else if (value < 0) {
    cb(t('manage.manage.5ulhopyeohc0'));
  } else if (num > 2) {
    cb(t('manage.manage.5ulhopyeokw0'));
  } else {
    return true;
  }
};
const formRef = ref();
const form: any = reactive({
  dataScore: {
    score: 0,
  },
  data: {
    mobile: "",
    country_code: "",
    agent_name: "",
    email: "",
    commission_rate: "",
    trs_interest_rate: "",
    toAgentName: "",
    pid: "",
  },
  rules: {
    mobile: [{ required: true, message: t('manage.manage.5ulhopyen900') }],
    agent_name: [{ required: true, message: t('manage.manage.5ulhopyemv80') }],
    email: [
      { required: true, message: t('manage.manage.5ulhopyenf00') },
      { type: "email", message: t('manage.manage.5ulhopyeop00') },
    ],
    toAgentName: [{ required: true, message: t('manage.manage.5ulhopyeo7w0') }],
    commission_rate: [
      { required: true, message: t('manage.manage.5ulhopyensc0') },
      { validator: validatorData },
    ],
    trs_interest_rate: [
      { required: true, message: t('manage.manage.5ulhopyenz40') },
      { validator: validatorData },
    ],
    country_code: [{ required: true, message: t('manage.manage.5ulhopyen1w0') }],
  },
});
const onClose = async () => {
  (form.data = {
    mobile: "",
    country_code: "",
    agent_name: "",
    email: "",
    commission_rate: "",
    trs_interest_rate: "",
    toAgentName: "",
    pid: "",
  }),
    formRef.value.resetFields();
};
// 创建
const showVisibleCreate = ref(false);
const handleCreateSubmit = async () => {
  const validate = await formRef.value?.validate();
  if (validate) return false;
  let params = { ...form.data };
  params.commission_rate = params.commission_rate + "";
  params.trs_interest_rate = params.trs_interest_rate + "";
  delete params.toAgentName;
  const { code, msg } = await apiCms.cmsAgentUserCreate({
    data: params,
  });
  if (code != 1) return false;
  Message.success({ content: msg });
  getData();
  return true;
};
const createBtn = async (val: any) => {
  form.data.pid = val.id;
  form.data.toAgentName = val.agent_name + "(" + val.user_name + ")";
  showVisibleCreate.value = true;
};

const countryCodeList = ref();
const getCountryCode = async () => {
  const { code, data } = await apiSystem.countryCodeList();
  if (code != 1) return;
  countryCodeList.value = data.map((item: any) => {
    item.country_code = `+${item.country_code}`;
    return item;
  });
};
// 修改状态
const handleChangeIntercept = async (val: any) => {
  const { code } = await apiCms.cmsAgentUserUpdateStatus({
    agentId: val.id,
    status: val.status,
  });
  if (code != 1) {
    val.status = val.status == 0 ? 1 : 0;
    return;
  }
  Message.success({
    content: t('manage.manage.5ulhopyeoxc0'),
  });
  getData();
};
const visible = ref(false);
const dataPass = ref({
  agent_name: "",
  user_name: "",
  id: "",
});
const handleOk = async () => {
  const { code, msg } = await apiCms.cmsAgentUserResetPassword({
    agentId: dataPass.value.id,
  });
  if (code != 1) return;
  Message.success({
    content: msg,
  });
  getData();
};

// 重置密码
const savaPassBtn = async (val: any) => {
  console.log(val);
  dataPass.value = val;
  visible.value = true;
};
{
  getCountryCode();
  getData();
}
</script>
<style scoped>
:deep(.arco-typography) {
  margin-bottom: 0;
}

:deep(.arco-input[disabled]) {
  -webkit-text-fill-color: var(--color-text-1);
}
</style>
