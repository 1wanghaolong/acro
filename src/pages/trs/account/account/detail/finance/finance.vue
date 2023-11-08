<template>
  <a-tabs v-model:active-key="active" @change="getData" justify>
    <template #extra>
      <a-button @click="form.show = true" type="primary" v-if='active == "2"'>
        <template #icon>
          <icon-edit />
        </template>
        {{$t('finance.finance.5um87h5qe5w0')}}
      </a-button>
    </template>
    <a-tab-pane key="" :title="$t('finance.finance.5um87h5qeq00')" :disabled="tableData.loading">
      <div class="tabBox">
        <div class="tableBox">
          <a-table
            :bordered="false"
            column-resizable
            :pagination="false"
            :loading="tableData.loading"
            :scroll="
              tableData.list?.length ? { x: '100%', y: '100%' } : undefined
            "
            size="small"
            :data="tableData.list"
            class="table"
          >
            <template #columns>
              <a-table-column title="#" :width="50">
                <template #cell="{ rowIndex }">
                  {{ rowIndex + 1 }}
                </template>
              </a-table-column>
              <a-table-column
                :title="`TRS${ $t('finance.finance.5um87h5qetc0') }`"
                data-index="trs_account_info.account"
                :width="120"
                :ellipsis="true"
                :tooltip="true"
              ></a-table-column>
              <a-table-column :title="$t('finance.finance.5um87h5qew40')" :width="120">
                <template #cell="{ record }">
                  <div>CN:{{ record.asset_account_info?.real_name }}</div>
                  <div>EN:{{ record.asset_account_info?.english_name }}</div>
                </template>
              </a-table-column>
              <a-table-column
                :title="$t('finance.finance.5um87h5qey40')"
                data-index="asset_account_info.account"
                :width="120"
                :ellipsis="true"
                :tooltip="true"
              ></a-table-column>
              <a-table-column :title="$t('finance.finance.5um87h5qf080')" data-index="currency" :width="80">
                <template #cell="{ record }">
                  <a-tag>{{ record.currency || $t('finance.finance.5um87h5qf280') }}</a-tag>
                </template>
              </a-table-column>
              <a-table-column :title="$t('finance.finance.5um87h5qf440')" :width="160">
                <template #cell="{ record }">
                  <div>{{ record.before_finance }}</div>
                </template>
              </a-table-column>
              <a-table-column :title="$t('finance.finance.5um87h5qf640')" :width="160">
                <template #cell="{ record }">
                  <div>
                    {{
                      Number(record.after_finance) -
                        Number(record.before_finance) >
                      0
                        ? "+"
                        : ""
                    }}{{
                      Number(record.after_finance) -
                      Number(record.before_finance)
                    }}
                  </div>
                </template>
              </a-table-column>
              <a-table-column :title="$t('finance.finance.5um87h5qf840')" :width="160">
                <template #cell="{ record }">
                  <div>{{ record.after_finance }}</div>
                </template>
              </a-table-column>
              <a-table-column :title="$t('finance.finance.5um87h5qfa00')" :width="100">
                <template #cell="{ record }">
                  <a-tag
                    size="small"
                    :color="
                      record?.status == 1
                        ? '#00b42a'
                        : record?.status == 2
                        ? '#ff7d00'
                        : '#f53f3f'
                    "
                  >
                    {{
                      useEnumsFormat(
                        "trs.account.finance.apply.status",
                        record.status
                      )
                    }}
                  </a-tag>
                </template>
              </a-table-column>
              <a-table-column :title="$t('finance.finance.5um87h5qfcc0')" :width="120">
                <template #cell="{ record }">
                  <div>
                    {{ dayjs.unix(record.create_time).format("YYYY-MM-DD") }}
                  </div>
                  <div>
                    {{ dayjs.unix(record.create_time).format("HH:mm:ss") }}
                  </div>
                </template>
              </a-table-column>
              <a-table-column :title="$t('finance.finance.5um87h5qff00')" :width="120">
                <template #cell="{ record }">
                  <div v-if="!record.check_time">-</div>
                  <div v-else>
                    <div>
                      {{ dayjs.unix(record.check_time).format("YYYY-MM-DD") }}
                    </div>
                    <div>
                      {{ dayjs.unix(record.check_time).format("HH:mm:ss") }}
                    </div>
                  </div>
                </template>
              </a-table-column>
              <a-table-column fixed="right" :title="$t('finance.finance.5um87h5qfgw0')" :width="80">
                <template #cell="{ record }">
                  <a-space>
                    <a-link
                      @click="
                        router.push({
                          name: 'trsAccountFinanceApplyDetail',
                          params: { id: record.id },
                        })
                      "
                      >{{$t('finance.finance.5um87h5qfj00')}}</a-link
                    >
                  </a-space>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>
        <div class="pagination">
          <a-pagination
            size="small"
            @change="getData"
            @page-size-change="getData"
            v-model:current="searchInfo.data.page"
            v-model:page-size="searchInfo.data.per_page"
            :total="tableData.count"
            show-total
            show-jumper
            show-page-size
          />
        </div>
      </div>
    </a-tab-pane>
    <a-tab-pane key="2" :title="$t('finance.finance.5um87h5qfkw0')" :disabled="tableData.loading">
      <div class="tabBox">
        <div class="tableBox">
          <a-table
            :bordered="false"
            column-resizable
            :pagination="false"
            :loading="tableData.loading"
            :scroll="
              tableData.list?.length ? { x: '100%', y: '100%' } : undefined
            "
            size="small"
            :data="tableData.list"
            class="table"
          >
            <template #columns>
              <a-table-column title="#" :width="50">
                <template #cell="{ rowIndex }">
                  {{ rowIndex + 1 }}
                </template>
              </a-table-column>
              <a-table-column
                :title="`TRS${ $t('finance.finance.5um87h5qetc0') }`"
                data-index="trs_account_info.account"
                :width="120"
                :ellipsis="true"
                :tooltip="true"
              ></a-table-column>
              <a-table-column :title="$t('finance.finance.5um87h5qew40')" :width="150">
                <template #cell="{ record }">
                  <div>CN:{{ record.asset_account_info?.real_name }}</div>
                  <div>EN:{{ record.asset_account_info?.english_name }}</div>
                </template>
              </a-table-column>
              <a-table-column
                :title="$t('finance.finance.5um87h5qey40')"
                data-index="asset_account_info.account"
                :width="120"
                :ellipsis="true"
                :tooltip="true"
              ></a-table-column>
              <a-table-column :title="$t('finance.finance.5um87h5qf080')" data-index="currency" :width="80">
                <template #cell="{ record }">
                  <a-tag>{{ record.currency || $t('finance.finance.5um87h5qf280') }}</a-tag>
                </template>
              </a-table-column>
              <a-table-column :title="$t('finance.finance.5um87h5qf440')" :width="160">
                <template #cell="{ record }">
                  <div>{{ record.before_finance }}</div>
                </template>
              </a-table-column>
              <a-table-column :title="$t('finance.finance.5um87h5qf640')" :width="160">
                <template #cell="{ record }">
                  <div>
                    {{
                      Number(record.after_finance) -
                        Number(record.before_finance) >
                      0
                        ? "+"
                        : ""
                    }}{{
                      Number(record.after_finance) -
                      Number(record.before_finance)
                    }}
                  </div>
                </template>
              </a-table-column>
              <a-table-column :title="$t('finance.finance.5um87h5qf840')" :width="160">
                <template #cell="{ record }">
                  <div>{{ record.after_finance }}</div>
                </template>
              </a-table-column>
              <a-table-column :title="$t('finance.finance.5um87h5qfms0')" :width="local.lang=='en'?140:100">
                <template #cell="{ record }">
                  <a-tag>{{
                    useEnumsFormat(
                      "trs.account.finance.apply.from_type",
                      record.from_type
                    )
                  }}</a-tag>
                </template>
              </a-table-column>
              <a-table-column :title="$t('finance.finance.5um87h5qfow0')" :width="local.lang=='en'?160:120">
                <template #cell="{ record }">
                  <div>{{ record?.operator_info?.nickname }}</div>
                  <div style="color: #b8c2cc">
                    ID:{{ record?.operator_info?.id }}
                  </div>
                </template>
              </a-table-column>
              <a-table-column :title="$t('finance.finance.5um87h5qfr40')" :width="120">
                <template #cell="{ record }">
                  <div>
                    {{ dayjs.unix(record.create_time).format("YYYY-MM-DD") }}
                  </div>
                  <div>
                    {{ dayjs.unix(record.create_time).format("HH:mm:ss") }}
                  </div>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>
        <div class="pagination">
          <a-pagination
            size="small"
            @change="getData"
            @page-size-change="getData"
            v-model:current="searchInfo.data.page"
            v-model:page-size="searchInfo.data.per_page"
            :total="tableData.count"
            show-total
            show-jumper
            show-page-size
          />
        </div>
      </div>
    </a-tab-pane>
    <!-- 修改授权金额 -->
    <a-modal
      draggable
      v-model:visible="form.show"
      :title="$t('finance.finance.5um87h5qfu40')"
      @cancel="form.show = false"
      @before-ok="submit"
    >
      <div style="display: flex">
        <div style="width: 100%">
            <a-form ref="formRef" :model="form.data" layout="vertical">
                <a-card :style="{ width: '100%' }">
                <div style="margin-bottom: 10px;color:rgb(var(--arcoblue-6))">{{$t('finance.finance.5um87h5qfww0')}}</div>
                <a-row :span="24">
                    <a-col :xs="24" :sm="8">
                    <a-form-item :label="$t('finance.finance.5um87h5qfyo0')">
                        {{ accountDetail?.currency }}
                    </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="8">
                    <a-form-item :label="$t('finance.finance.5um87h5qg0k0')">
                        {{ accountDetail?.total_cash }}
                    </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="8">
                    <a-form-item :label="$t('finance.finance.5um87h5qg280')">
                        {{ accountDetail?.total_assure_cash }}
                    </a-form-item>
                    </a-col>
                </a-row>
                <a-row :span="24">
                    <a-col :xs="24" :sm="8">
                    <a-form-item :label="$t('finance.finance.5um87h5qg3k0')">
                        {{ accountDetail?.total_finance }}
                    </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="8">
                    <a-form-item :label="$t('finance.finance.5um87h5qg500')">
                        {{useEnumsFormat('trs.account.interest_accrual_type', accountDetail?.interest_accrual_type) }}
                    </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="8">
                    <a-form-item :label="$t('finance.finance.5um87h5qg6o0')">
                        {{ accountDetail?.interest_accrual_amount }}
                    </a-form-item>
                    </a-col>
                </a-row>
                </a-card>
            </a-form>
            <a-row :span="24" style='margin:20px 0 0'>
                <a-col :xs="24" :sm="24">
                <a-form-item :label="$t('finance.finance.5um87h5qg3k0')">
                    <a-select  v-model="province" :style="{width:'100px'}" :placeholder="$t('finance.finance.5um87h5qg880')" >
                        <a-option :value='1'>{{$t('finance.finance.5um87h5qgb40')}}</a-option>
                        <a-option :value='2'>{{$t('finance.finance.5um87h5qgd40')}}</a-option>
                    </a-select>
                    <a-input style="flex:1" :placeholder="$t('finance.finance.5um87h5qgeo0')" v-model='totalFinance'>
                        <template #append>{{accountDetail?.currency}}</template>
                    </a-input>
                </a-form-item>
                </a-col>
            </a-row>
        </div>
        <!-- <a-form ref="formRef" :model="form.data" layout="vertical">
          <a-row :gutter="6">
            <a-col :xs="24" :sm="12">
              <a-form-item :label="$t('finance.finance.5um87h5qggc0')">
                {{ accountDetail?.total_finance }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
              <a-form-item :label="$t('finance.finance.5um87h5qg500')">
                {{
                  useEnumsFormat(
                    "trs.account.interest_accrual_type",
                    accountDetail?.interest_accrual_type
                  )
                }}
              </a-form-item>
            </a-col>
            <a-col
              :xs="24"
              :sm="12"
              v-if="accountDetail?.interest_accrual_type != 1"
            >
              <a-form-item :label="$t('finance.finance.5um87h5qg6o0')">
                {{ accountDetail?.finance_interest_accrual_amount }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
              <a-form-item :label="$t('finance.finance.5um87h5qgho0')">
                {{ accountDetail?.currency }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
              <a-form-item :label="$t('finance.finance.5um87h5qgj80')">
                {{ accountDetail?.summary_cash }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
              <a-form-item :label="$t('finance.finance.5um87h5qgkw0')">
                {{ accountDetail?.total_cash }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
              <a-form-item :label="$t('finance.finance.5um87h5qglw0')">
                {{ accountDetail?.total_assure_cash }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
              <a-form-item :label="$t('finance.finance.5um87h5qgnk0')">
                <a-select
                  v-model="form.data.change_type"
                  :placeholder="$t('finance.finance.5um87h5qgp00')"
                >
                  <a-option
                    v-for="item in useEnums(
                      'trs.account.finance.apply.change_type'
                    )"
                    :value="item.value"
                  >
                    {{ item.trans[local.lang] }}
                  </a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
              <a-form-item
                field="amount"
                :label="$t('finance.finance.5um87h5qgqg0')"
                :rules="[{ required: true, message: $t('finance.finance.5um87h5qgsg0') }]"
              >
                <a-input-number
                  v-model="form.data.amount"
                  :placeholder="$t('finance.finance.5um87h5qgu80')"
                />
              </a-form-item>
            </a-col>
            <a-col
              :xs="24"
              :sm="12"
              v-if="accountDetail?.interest_accrual_type != 1"
            >
              <a-form-item :label="$t('finance.finance.5um87h5qgvo0')">
                <a-select
                  v-model="form.data.is_follow"
                  :placeholder="$t('finance.finance.5um87h5qgx80')"
                >
                  <a-option
                    v-for="item in useEnums(
                      'trs.account.finance.apply.is_follow'
                    )"
                    :value="item.value"
                  >
                    {{ item.trans[local.lang] }}
                  </a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col
              :xs="24"
              :sm="12"
              v-if="
                !form.data.is_follow &&
                accountDetail?.interest_accrual_type != 1
              "
            >
              <a-form-item :label="$t('finance.finance.5um87h5qgzk0')">
                <a-select
                  v-model="form.data.interest_change_type"
                  :placeholder="$t('finance.finance.5um87h5qh1s0')"
                >
                  <a-option
                    v-for="item in useEnums(
                      'trs.account.finance.apply.change_type'
                    )"
                    :value="item.value"
                  >
                    {{ item.trans[local.lang] }}
                  </a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" v-if="!form.data.is_follow">
              <a-form-item
                field="interest_amount"
                :label="$t('finance.finance.5um87h5qh380')"
                :rules="[{ required: true, message: $t('finance.finance.5um87h5qgsg0') }]"
              >
                <a-input-number
                  v-model="form.data.interest_amount"
                  :placeholder="$t('finance.finance.5um87h5qgu80')"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form> -->
      </div>
    </a-modal>
  </a-tabs>
</template>

<script lang="ts" setup>
import { useEnumsFormat } from "@/hooks/enums";
import dayjs from "dayjs";
const local = useLocal();
const active = ref("");
const formRef = ref();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const accountDetail = ref();
const province:any = ref(1)
const totalFinance:any = ref("")
const form: any = reactive({
  show: false,
  loading: false,
  setup: false,
  data: {
    amount: 0,
    change_type: 1,
    interest_change_type: 1,
    is_follow: 1,
    interest_amount: 0,
  },
});
const searchInfo = reactive({
  data: {
    page: 1,
    per_page: 20,
  },
});
const tableData = reactive({
  show: false,
  loading: false,
  list: [],
  count: 0,
});
// const submit = async () => {
//   const validate = await formRef.value?.validate();
//   if (validate) return false;
//   if (!form.data.amount) {
//     Message.info({ content: "请输入大于0的授权金额变动金额" });
//     return false;
//   }
//   form.loading = true;
//   let finance_amount = Number(accountDetail.value?.total_finance);
//   let finance_interest_accrual_amount = Number(
//     accountDetail.value?.finance_interest_accrual_amount
//   );
//   if (form.data.change_type == 1) {
//     finance_amount += form.data.amount;
//   } else {
//     finance_amount -= form.data.amount;
//   }
//   if (form.data.is_follow) {
//     if (form.data.change_type == 1) {
//       finance_interest_accrual_amount += form.data.amount;
//     } else {
//       finance_interest_accrual_amount -= form.data.amount;
//     }
//   } else {
//     if (form.data.interest_change_type == 1) {
//       finance_interest_accrual_amount += form.data.interest_amount;
//     } else {
//       finance_interest_accrual_amount -= form.data.interest_amount;
//     }
//   }
//   form.loading = false;
//   if (code != 1) return false;
//   formRef.value?.resetFields();
//   Message.success({ content: msg });
//   getData();
// };
const submit = async () => {
//   const validate = await formRef.value?.validate();
//   if (validate) return false;
  if (!totalFinance.value) {
    Message.info({ content: t('finance.finance.5um87h5qh4k0') });
    return false;
  }
  if (province.value == '1' && (Number(accountDetail.value.total_finance) + Number(totalFinance.value)) < Number(accountDetail.value.total_cash)) {
    Message.info({ content: t('finance.finance.5um87h5qh640') });
    return false;
  }
  if (province.value == '2' && ( Number(accountDetail.value.total_finance) - Number(totalFinance.value)) < Number(accountDetail.value.total_cash)) {
    Message.info({ content: t('finance.finance.5um87h5qh640') });
    return false;
  }
  form.loading = true;
  const { code, msg } = await apiTrs.financeApplyCreate({
    data: {
      is_follow: form.data.is_follow,
      trs_account_id: route.params?.id,
      operator_id: local.userInfo?.id || 1,
      update_finance:province.value == '1' ? Number(totalFinance.value) : Number(-totalFinance.value),
      finance_interest_accrual_amount:accountDetail.value.finance_interest_accrual_amount,
    },
  });
  form.loading = false;
  if (code != 1) return false;
  // formRef.value?.resetFields();
  province.value = 1
  totalFinance.value = ''
  Message.success({ content: msg });
  getData();
  getAccountDetail()
};
const getData = async () => {
  tableData.loading = true;
  const { code, data } = await apiTrs.financeApplyList(
    useFilter({
      ...searchInfo.data,
      status: active.value ? active.value : null,
      from_type: active.value ? null : 2,
      trs_account_id: route.params?.id,
    })
  );
  tableData.loading = false;
  if (code != 1) return;
  tableData.list = data.list;
  tableData.count = data.count;
};
const getAccountDetail = async () => {
  const { code, data } = await apiTrs.accountInfo({
    id: route.params?.id,
  });
  if (code != 1) return;
  accountDetail.value = data;
};
onMounted(() => {
  if (route.query?.create) {
    form.show = true;
  }
});
{
  getData();
  getAccountDetail();
}
</script>
