<template>
  <div class="wrap">
    <Breadcrumb />
    <a-card class="generalCard">
      <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
      <a-card :loading="loading" style="margin-bottom:15px">
        <template #title>
          <div style="display: flex;justify-content: space-between;">
            <a-space :size="18">
              {{$t('order.detail.5umc2zz3ki80')}}
            </a-space>
          </div>
        </template>
        <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('order.detail.5umc2zz3mdo0')">
                {{ dataAll.info?.order_no || '-' }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">

              <a-form-item :label="$t('order.detail.5umc2zz3mlw0')">
                {{ dataAll.info?.create_time ? dayjs.unix(dataAll.info.create_time).format('YYYY-MM-DD HH:mm:ss') : '-' }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('order.detail.5umc2zz3mqc0')">
                {{ useEnumsFormat('wealth.transaction.transactionRecords.status', dataAll.info?.status) }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('order.detail.5umc2zz3mu80')">
                {{ dataAll.info.finish_time ? dayjs.unix(dataAll.info.finish_time).format('YYYY-MM-DD HH:mm:ss') : '-' }}
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-card :loading="loading" style="margin-bottom:15px" v-if="dataAll.info?.status == 6">
        <template #title>
          <div style="display: flex;justify-content: space-between;">
            <a-space :size="18">
              {{$t('order.detail.5umc2zz3myg0')}}
            </a-space>
          </div>
        </template>
        <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item label="">
                {{ dataAll.info?.reason || '-' }}
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-card :loading="loading" style="margin-bottom:15px">
        <template #title>
          <div style="display: flex;justify-content: space-between;">
            <p>{{$t('order.detail.5umc2zz3n1w0')}}</p>
            <p style="color:#2174f3;" v-if="dataAll.info?.status == 0">
              <a-button v-permission="['wealthOrderEdit']" @click="publicVisibleOpen(1)" type="primary">
                {{$t('order.detail.5umc2zz3n940')}}
              </a-button>
            </p>
          </div>
        </template>
        <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('order.detail.5umc2zz3ne00')">
                {{ dataAll.info?.symbol_name }} {{ dataAll.info?.symbol }}.{{ dataAll.info?.market ?
                  useEnumsFormat('market.market', dataAll.info?.market) : '' }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('order.detail.5umc2zz3nl40')">
                {{ dataAll.info?.options_product_info?.product_name }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('order.detail.5umc2zz3nps0')">
                {{ $numberFormat(dataAll.info?.nominal_principal) }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('order.detail.5umc2zz3ny40')">
                {{ dataAll.info?.currency }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('order.detail.5umc2zz3o280')">
                {{ dataAll.info?.start_time ? dayjs.unix(dataAll.info?.start_time).format('YYYY-MM-DD') : '-' }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('order.detail.5umc2zz3o5s0')">
                {{ dataAll.info?.end_time ? dayjs.unix(dataAll.info?.end_time).format('YYYY-MM-DD') : '-' }}
              </a-form-item>
            </a-col>

          </a-row>
        </a-form>
      </a-card>
      <a-card :loading="loading" style="margin-bottom:15px">
        <template #title>
          <div style="display: flex;justify-content: space-between;">
            <p>{{$t('order.detail.5umc2zz3o9s0')}}</p>
            <p style="color:#2174f3;" v-if="dataAll.info?.status == 0">
              <a-button v-permission="['wealthOrderUpdateParamsContent']" @click="publicVisibleOpen(2)" type="primary">
                {{$t('order.detail.5umc2zz3n940')}}
              </a-button>
            </p>
          </div>
        </template>
        <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6" v-for="item in dataAll.info?.framework_params">
              <a-form-item :label="item?.params_name">
                {{ item?.name }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="!dataAll.info?.framework_params?.length">
              <a-form-item>
                -
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-divider />
        <p style="font-size: 16px;line-height: 1.5715;margin:20px 0">{{$t('order.detail.5umc2zz3odg0')}}</p>
        <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6" v-for="item in dataAll.info?.quote_params">
              <a-form-item :label="item?.params_name">
                {{ item?.name }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="!dataAll.info?.quote_params?.length">
              <a-form-item>
                -
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-card :loading="loading" style="margin-bottom:15px">
        <template #title>
          <div style="display: flex;justify-content: space-between;">
            <a-space :size="18">
              {{$t('order.detail.5umc2zz3oh80')}}
            </a-space>
          </div>
        </template>
        <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('order.detail.5umc2zz3ol00')">
                <template v-if="dataAll.info?.status == 1">
                  {{ $numberFormat(dataAll.info?.freeze_price) || '-' }} {{ dataAll.info?.freeze_price ? dataAll.info?.currency :
                    '' }}
                </template>
                <template v-else>
                  -
                </template>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('order.detail.5umc2zz3oos0')">
                <template v-if="dataAll.info?.status == 2 || dataAll.info?.status == 3">
                  {{ $numberFormat(dataAll.info?.deal_nominal_principal) || '-' }} {{ dataAll.info?.deal_nominal_principal ?
                    dataAll.info?.currency :
                    '' }}
                </template>
                <template v-else>
                  -
                </template>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('order.detail.5umc2zz3ot00')">
                <template v-if="dataAll.info?.status == 2 || dataAll.info?.status == 3">
                  {{ $numberFormat(dataAll.info?.cost_price) || '-' }} {{ dataAll.info?.cost_price ? dataAll.info?.currency :
                    '' }}
                </template>
                <template v-else>
                  -
                </template>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-card :loading="loading" style="margin-bottom:15px">
        <template #title>
          <div style="display: flex;justify-content: space-between;">
            <a-space :size="18">
              {{$t('order.detail.5umc2zz3p000')}}
            </a-space>
          </div>
        </template>
        <div style="margin-bottom:16px">
          <a-button v-permission="['wealthOrderCounterpartiesQuoteCreate']" type="primary"
            :disabled="dataAll.info?.status == 6" @click="addOpponentShow = true">
            <template #icon>
              <icon-plus />
            </template>
            {{$t('order.detail.5umc2zz3p3s0')}}
          </a-button>
          <span style="margin-left:10px">{{$t('order.detail.5umc2zz3p7s0')}} {{ costPriceAll ? $numberFormat(costPriceAll) : '-' }} {{ costPriceAll ?
            dataAll.info?.currency
            :
            '' }}</span>
        </div>
        <p style="margin-bottom:15px">{{$t('order.detail.5umc2zz3pao0')}}</p>
        <div>
          <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
            :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small" :data="tableData.list"
            class="table">
            <template #columns>
              <a-table-column title="#" :width="50">
                <template #cell="{ rowIndex }">
                  {{ rowIndex + 1 }}
                </template>
              </a-table-column>
              <a-table-column :title="$t('order.detail.5umc2zz3nps0')" data-index="deal_nominal_principal">
                <template #cell="{ record }">
                    <span>{{ $numberFormat(record?.deal_nominal_principal) }}</span>
                </template>
              </a-table-column>
              <a-table-column :title="$t('order.detail.5umc2zz3ny40')">
                <template #cell>
                    <a-tag>{{ dataAll.info?.currency }}</a-tag>
                </template>
              </a-table-column>
              <a-table-column :title="$t('order.detail.5umc2zz3pdg0')" data-index="counterparties_info.name"></a-table-column>
              <a-table-column :title="$t('order.detail.5umc2zz3p7s0')" data-index="cost_price">
                <template #cell="{ record }">
                    <span>{{ $numberFormat(record?.cost_price) }}</span>
                </template>
              </a-table-column>

              <a-table-column :title="$t('order.detail.5umc2zz3pgg0')">
                <template #cell="{ record }">
                  <div>{{ record.deal_time ? dayjs.unix(record.deal_time).format('YYYY-MM-DD') : '' }}
                  </div>
                  <div>{{ record.deal_time ? dayjs.unix(record.deal_time).format('HH:mm:ss') : '' }}</div>
                </template>
              </a-table-column>
              <a-table-column fixed="right" :title="$t('order.detail.5umc2zz3pjg0')" :width="150"
                v-if="$permission(['wealthOrderCounterpartiesQuoteUpdate', 'wealthOrderCounterpartiesQuoteDelete'])">
                <template #cell="{ record }">
                  <a-space>
                    <a-button v-permission="['wealthOrderCounterpartiesQuoteUpdate']" style="padding-left: 0;" type="text"
                      @click="editOpponentBtn(record)" size="small">
                      {{ $t('order.detail.5umc2zz3n940') }}
                    </a-button>
                    <a-popconfirm position="left" @ok="deleteOpponentBtn(record)" :content="$t('order.detail.5umc6hjbugc0')">
                      <a-button v-permission="['wealthOrderCounterpartiesQuoteDelete']" type="text" status="danger"
                        size="small">
                        {{ $t('order.detail.5umc2zz3pmo0') }}
                      </a-button>
                    </a-popconfirm>
                  </a-space>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>
        <div class="pagination">
          <a-pagination size="small" @change="getDataList" @page-size-change="getDataList"
            v-model:current="searchInfo.data.page" v-model:page-size="searchInfo.data.per_page" :total="tableData.count"
            show-total show-jumper show-page-size />
        </div>

      </a-card>
      <a-card :loading="loading" style="margin-bottom:15px">
        <template #title>
          <div style="display: flex;justify-content: space-between;">
            <a-space :size="18">
              {{$t('order.detail.5umc2zz3ppk0')}}
            </a-space>
          </div>
        </template>
        <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('order.detail.5umc2zz3psg0')">
                {{ dataAll.info?.asset_account_info?.account }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('order.detail.5umc2zz3pvk0')">
                {{ dataAll.info?.asset_account_info?.real_name }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('order.detail.5umc2zz3pyk0')">
                {{ dataAll.info?.asset_account_info?.english_name }}
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-card :loading="loading"
        v-if="dataAll.info?.status == 0 || dataAll.info?.status == 1 || dataAll.info?.status == 4 "
        style="margin-bottom:15px">
        <template #title>
          <div style="display: flex;justify-content: space-between;">
            <a-space :size="18">
              {{$t('order.detail.5umc2zz3pjg0')}}
            </a-space>
          </div>
        </template>
        <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="24">
              <a-button v-permission="['wealthOrderUpdate']" type="primary" @click="modifyStatusModal">
                {{ $t('order.detail.5umc2zz3q4c0') }}
              </a-button>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
    </a-card>
    <!-- 添加编辑对手交易明细 -->
    <a-modal :mask-closable=false v-model:visible="addOpponentShow" @close="onClose" :ok-loading="false"
      :on-before-ok="addOpponentBtn">
      <template #title>
        {{ allForm.counterparties_update_id ? $t('order.detail.5umc2zz3q7k0') : $t('order.detail.5umc2zz3qas0') }}
      </template>
      <div>
        <div style="display: flex;margin-top:15px">
          <a-form ref="formRef" :model="allForm" layout="vertical">
            <a-form-item v-if="!allForm.counterparties_update_id" field="counterparties_id" :label="$t('order.detail.5umc2zz3qe40')"
              :rules="[{ required: true, message: $t('order.detail.5umc2zz3s2k0') }]" :validate-trigger="['change', 'input']">
              <a-select v-model="allForm.counterparties_id" :placeholder="$t('order.detail.5umc2zz3s7w0')">
                <a-option v-for="item of rivalList" :value="item.id" :label="item.name" />
              </a-select>
            </a-form-item>
            <a-form-item field="deal_nominal_principal" :label="$t('order.detail.5umc2zz3oos0')"
              :rules="[{ required: true, message: $t('order.detail.5umc2zz3s2k0') }, { match: /^\d+(\.\d+)?$/, message: $t('order.detail.5umc2zz3saw0') }]"
              :validate-trigger="['change', 'input']">
              <div style="width: 100%;">
                <a-input-number hide-button style="width: 100%;" v-model="allForm.deal_nominal_principal"
                  :placeholder="$t('order.detail.5umc2zz3sec0')">
                  <template #append>{{ dataAll.info?.currency }}</template>
                </a-input-number>
              </div>
            </a-form-item>
            <a-form-item field="cost_price" :label="$t('order.detail.5umc2zz3p7s0')"
              :rules="[{ required: true, message: $t('order.detail.5umc2zz3s2k0') }, { match: /^\d+(\.\d+)?$/, message: $t('order.detail.5umc2zz3sig0') }]"
              :validate-trigger="['change', 'input']">
              <div style="width: 100%;">
                <a-input-number hide-button style="width: 100%;" v-model="allForm.cost_price" :placeholder="$t('order.detail.5umc2zz3sec0')">
                  <template #append>{{ dataAll.info?.currency }}</template>
                </a-input-number>
              </div>
            </a-form-item>
            <a-form-item field="deal_time" :label="$t('order.detail.5umc2zz3pgg0')" :rules="[{ required: true, message: $t('order.detail.5umc2zz3s2k0') }]"
              :validate-trigger="['change', 'input']">
              <a-date-picker show-time style="width:100%" v-model="allForm.deal_time" :placeholder="$t('order.detail.5umc2zz3slg0')" />
            </a-form-item>

          </a-form>
        </div>
      </div>
    </a-modal>
    <!-- 公用对话框 -->
    <a-modal :mask-closable=false v-model:visible="publicVisibleShow" @close="onClose" :ok-loading="false"
      :on-before-ok="publicVisibleBtn">
      <template #title>
        {{ publicVisibleTitle }}
      </template>
      <div v-if="identifying == 1">
        <a-form ref="formRef" :model="publicForm" layout="vertical">
          <a-form-item field="currency" :label="$t('order.detail.5umc2zz3ny40')" :rules="[{ required: true, message: $t('order.detail.5umc2zz3s2k0') }]"
            :validate-trigger="['change', 'input']">
            <a-select v-model="publicForm.currency" :placeholder="$t('order.detail.5umc2zz3s7w0')">
              <a-option v-for="item of currencyEnum" :value="item.value" :label="item.name" />
            </a-select>
          </a-form-item>
          <a-form-item field="nominal_principal" :label="$t('order.detail.5umc2zz3nps0')"
            :rules="[{ required: true, message: $t('order.detail.5umc2zz3s2k0') }, { validator: validator }]"
            :validate-trigger="['change', 'input']">
            <div style="width: 100%;">
              <a-input-number hide-button style="width: 100%;" v-model="publicForm.nominal_principal" :placeholder="$t('order.detail.5umc2zz3sec0')">
                <!-- <template #append>{{ dataAll.info?.currency }}</template> -->
              </a-input-number>
            </div>
          </a-form-item>
          <a-form-item field="start_time" :label="$t('order.detail.5umc2zz3o280')" :rules="[{ required: true, message: $t('order.detail.5umc2zz3s2k0') }]"
            :validate-trigger="['change', 'input']">
            <a-date-picker style="width:100%" v-model="publicForm.start_time" :placeholder="$t('order.detail.5umc2zz3slg0')" />
          </a-form-item>
          <a-form-item :disabledDate="disabledDate" field="end_time" :label="$t('order.detail.5umc2zz3o5s0')"
            :rules="[{ required: true, message: $t('order.detail.5umc2zz3s2k0') },{ validator: validatorTime }]" :validate-trigger="['change', 'input']">
            <a-date-picker style="width:100%" v-model="publicForm.end_time" :placeholder="$t('order.detail.5umc2zz3slg0')" />
          </a-form-item>

        </a-form>
      </div>
      <div v-if="identifying == 2">
        <a-form ref="formRef" :model="structureParameters" class="form" layout="vertical">
          <template v-for="item in WealthOptionsProductInfo?.framework_params">
            <a-form-item v-if="item.params_type == 'checkbox'" :field="item?.key" :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('order.detail.5umc2zz3s2k0') }] : []">
              <a-select :limit="item.config.max" multiple @click="structureGear(item)"
                v-model="structureParameters[item.key]" :placeholder="$t('order.detail.5umc2zz3s7w0')">
                <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'radio'" :field="item?.key" :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('order.detail.5umc2zz3s2k0') }] : []">

              <a-select v-model="structureParameters[item.key]" :placeholder="$t('order.detail.5umc2zz3s7w0')">
                <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'gear_number'" :field="item?.key"
              :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('order.detail.5umc2zz3s2k0') }] : []">

              <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('order.detail.5umc2zz3s7w0')">
                <a-option v-for="items of structureGearVariable">{{ items }}</a-option>
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'gear_percent'" :field="item?.key"
              :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('order.detail.5umc2zz3s2k0') }] : []">

              <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('order.detail.5umc2zz3s7w0')">
                <a-option v-for="items of structureGearVariable">{{ items }}</a-option>
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'percent'" :field="item?.key"
              :rules="item.config.required ? [{ required: true, message: $t('order.detail.5umc2zz3s2k0') }, { match: /^-?\d+(\.\d+)?$/, message: $t('order.detail.5umc2zz3so80') }] : []"
              :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('order.detail.5umc2zz3sec0')">
                <template #append>%</template>
              </a-input-number>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'float'"
              :rules="item.config.required ? [{ required: true, message: $t('order.detail.5umc2zz3s2k0') }, { match: /^-?\d+(\.\d+)?$/, message: $t('order.detail.5umc2zz3so80') }] : []"
              :field="item?.key" :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('order.detail.5umc2zz3sec0')">
              </a-input-number>
            </a-form-item>
            <a-form-item v-else :field="item?.key"
              :rules="item.config.required ? [{ required: true, message: $t('order.detail.5umc2zz3s2k0') }, { match: /^-?\d+(\.\d+)?$/, message: $t('order.detail.5umc2zz3so80') }] : []"
              :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('order.detail.5umc2zz3sec0')">
              </a-input-number>
            </a-form-item>
          </template>
          <a-divider v-if="WealthOptionsProductInfo?.quote_params?.length" />
          <template v-for="item in WealthOptionsProductInfo?.quote_params">
            <a-form-item v-if="item.params_type == 'checkbox'" :field="item?.key" :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('order.detail.5umc2zz3s2k0') }] : []">
              <a-select :limit="item.config.max" multiple @click="structureGear(item)"
                v-model="structureParameters[item.key]" :placeholder="$t('order.detail.5umc2zz3s7w0')">
                <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'radio'" :field="item?.key" :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('order.detail.5umc2zz3s2k0') }] : []">

              <a-select v-model="structureParameters[item.key]" :placeholder="$t('order.detail.5umc2zz3s7w0')">
                <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'gear_number'" :field="item?.key"
              :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('order.detail.5umc2zz3s2k0') }] : []">

              <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('order.detail.5umc2zz3s7w0')">
                <a-option v-for="items of structureGearVariable" :value="items" :label="items"></a-option>
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'gear_percent'" :field="item?.key"
              :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('order.detail.5umc2zz3s2k0') }] : []">

              <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('order.detail.5umc2zz3s7w0')">
                <a-option v-for="items of structureGearVariable" :value="items" :label="items"></a-option>
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'percent'" :field="item?.key"
              :rules="item.config.required ? [{ required: true, message: $t('order.detail.5umc2zz3s2k0') }, { match: /^-?\d+(\.\d+)?$/, message: $t('order.detail.5umc2zz3so80') }] : []"
              :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('order.detail.5umc2zz3sec0')">
                <template #append>%</template>
              </a-input-number>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'float'"
              :rules="item.config.required ? [{ required: true, message: $t('order.detail.5umc2zz3s2k0') }, { match: /^-?\d+(\.\d+)?$/, message: $t('order.detail.5umc2zz3so80') }] : []"
              :field="item?.key" :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('order.detail.5umc2zz3sec0')">
              </a-input-number>
            </a-form-item>
            <a-form-item v-else :field="item?.key"
              :rules="item.config.required ? [{ required: true, message: $t('order.detail.5umc2zz3s2k0') }, { match: /^-?\d+(\.\d+)?$/, message: $t('order.detail.5umc2zz3so80') }] : []"
              :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('order.detail.5umc2zz3sec0')">
              </a-input-number>
            </a-form-item>
          </template>
        </a-form>
      </div>
    </a-modal>
    <a-modal @close="onClose" :mask-closable=false v-model:visible="modifyStatusVisible" :on-before-ok="modifyStatusBtn">
      <template #title>
        {{$t('order.detail.5umc2zz3q4c0')}}
      </template>
      <div>
        <a-form ref="formRef" :model="allStatusForm" layout="vertical">
          <a-form-item field="status" :label="$t('order.detail.5umc2zz3sr80')" :rules="[{ required: true, message: $t('order.detail.5umc2zz3s2k0') }]"
            :validate-trigger="['change', 'input']">
            <a-select v-if="dataAll.info?.status == '1'" v-model="allStatusForm.status" :placeholder="$t('order.detail.5umc2zz3s7w0')">
              <a-option v-for="item in useEnums('wealth.transaction.transactionRecords.status2')" :value="item.value">{{
                item.trans[local.lang] }}</a-option>
            </a-select>
            <a-select v-else-if="dataAll.info?.status == '4'" v-model="allStatusForm.status" :placeholder="$t('order.detail.5umc2zz3s7w0')">
              <a-option v-for="item in useEnums('wealth.transaction.transactionRecords.status4')" :value="item.value">{{
                item.trans[local.lang] }}</a-option>
            </a-select>
            <a-select v-else v-model="allStatusForm.status" :placeholder="$t('order.detail.5umc2zz3s7w0')">
              <a-option v-for="item in useEnums('wealth.transaction.transactionRecords.status1')" :value="item.value">{{
                item.trans[local.lang] }}</a-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('order.detail.5umc2zz3sy80')" v-if="allStatusForm.status == '2' || allStatusForm.status == '3'">
            <a-switch :checked-value="1" :unchecked-value="0" v-model="allStatusForm.create_position" /><span
              style="margin-left:10px">{{
                allStatusForm.create_position == 0 ? $t('order.detail.5umc2zz3t280') : $t('order.detail.5umc2zz3t540') }}</span>
          </a-form-item>
          <a-form-item v-if="allStatusForm.status == '2' || allStatusForm.status == '3'" field="deal_nominal_principal"
            :label="$t('order.detail.5umc2zz3oos0')"
            :rules="[{ required: true, message: $t('order.detail.5umc2zz3s2k0') }, { match: /^\d+(\.\d+)?$/, message: $t('order.detail.5umc2zz3saw0') }]"
            :validate-trigger="['change', 'input']">
            <div style="width: 100%;">
              <a-input-number hide-button style="width: 100%;" v-model="allStatusForm.deal_nominal_principal"
                :placeholder="$t('order.detail.5umc2zz3sec0')">
                <template #append>{{ dataAll.info?.currency }}</template>
              </a-input-number>
            </div>
          </a-form-item>
          <a-form-item v-if="allStatusForm.status != '6'&&allStatusForm.status != '0'" field="cost_price" :label="$t('order.detail.5umc2zz3ot00')"
            :rules="[{ required: true, message: $t('order.detail.5umc2zz3s2k0') }, { validator: validators }]"
            :validate-trigger="['change', 'input']">
            <div style="width: 100%;">
              <a-input-number hide-button style="width: 100%;" v-model="allStatusForm.cost_price" :placeholder="$t('order.detail.5umc2zz3sec0')">
                <template #append>{{ dataAll.info?.currency }}</template>
              </a-input-number>
              <p v-if="allStatusForm.status != '4' && allStatusForm.status != '5'"
                style="margin-bottom: 0;margin-top:15px">
                {{ allStatusForm.status == 1 ? $t('order.detail.5umc2zz3t8g0') : $t('order.detail.5umc2zz3tds0') }}</p>
            </div>
          </a-form-item>
          <a-form-item v-if="allStatusForm.status == '2' || allStatusForm.status == '3'" field="deal_time" :label="$t('order.detail.5umc2zz3pgg0')"
            :rules="[{ required: true, message: $t('order.detail.5umc2zz3s2k0') }]" :validate-trigger="['change', 'input']">
            <a-date-picker show-time style="width:100%" v-model="allStatusForm.deal_time" :placeholder="$t('order.detail.5umc2zz3slg0')" />
          </a-form-item>
          <a-form-item
            v-if="(allStatusForm.status == '2' || allStatusForm.status == '3') && allStatusForm.create_position == 1"
            field="opening_price" :label="$t('order.detail.5umc2zz3th80')" :rules="[{ required: true, message: $t('order.detail.5umc2zz3s2k0') }, { validator: validators }]"
            :validate-trigger="['change', 'input']">
            <div style="width: 100%;">
              <a-input style="width: 100%;" v-model="allStatusForm.opening_price" :placeholder="$t('order.detail.5umc2zz3sec0')">
              </a-input>
            </div>
          </a-form-item>
          <a-form-item v-if="allStatusForm.status == '6'" field="reason" :label="$t('order.detail.5umc2zz3tk80')"
            :rules="[{ required: true, message: $t('order.detail.5umc2zz3s2k0') }]" :validate-trigger="['change', 'input']">
            <div style="width: 100%;">
              <a-textarea v-model="allStatusForm.reason" :auto-size="{
                minRows: 6,
                maxRows: 8
              }" />
            </div>
          </a-form-item>

        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat, useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const { t } = useI18n();
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const loading = ref(false)

const dataAll: any = reactive({
  info: {}
})
const getData = async () => {
  loading.value = true
  const { code, data } = await apiWealth.apiWealthOrderInfo({
    id: route.params?.id
  })
  loading.value = false
  if (code != 1) return;
  dataAll.info = data
  if (dataAll.info.framework_params?.length) {
    dataAll.info.framework_params.forEach((item: any) => {
      if (item.params_type == 'gear_percent' || item.params_type == 'percent') {
        item.name = item.params_content + '%'
      } else if (item.params_type == 'radio' || item.params_type == 'checkbox') {
        let arr: any = []
        item.params_content.forEach((items: any) => {
          arr.push(items?.text[local.lang])
        })
        item.name = arr.join(',')
      } else {
        item.name = item.params_content
      }
    })
  }
  if (dataAll.info.quote_params?.length) {
    dataAll.info.quote_params.forEach((item: any) => {
      if (item.params_type == 'gear_percent' || item.params_type == 'percent') {
        item.name = item.params_content + '%'
      } else if (item.params_type == 'radio' || item.params_type == 'checkbox') {
        let arr: any = []
        item.params_content.forEach((items: any) => {
          arr.push(items?.text[local.lang])
        })
        item.name = arr.join(',')
      } else {
        item.name = item.params_content
      }
    })
  }
}
{
  getData()
}
const tableData = reactive({
  list: [],
  count: 0,
  message: [],
  loading: false
})
const searchInfo = reactive({
  show: false,
  data: {
    order_id: route.params?.id,
    page: 1,
    per_page: 20
  }
})
const costPriceAll = ref(0)
const getDataList = async () => {
  tableData.loading = true
  const { code, data } = await apiWealth.apiWealthOrderCounterpartiesQuoteList({
    ...useFilter(searchInfo.data)
  })
  tableData.loading = false
  if (code != 1) return;
  costPriceAll.value = 0
  if (data.list?.length) {
    data.list.forEach((arr: any) => {
      costPriceAll.value += Number(arr.cost_price)
      if (arr.framework_params?.length) {
        arr.framework_params.forEach((item: any) => {
          if (item.params_type == 'gear_percent' || item.params_type == 'percent') {
            item.name = item.params_content + '%'
          } else if (item.params_type == 'radio' || item.params_type == 'checkbox') {
            let arr: any = []
            item.params_content.forEach((items: any) => {
              arr.push(items?.text[local.lang])
            })
            item.name = arr.join(',')
          } else {
            item.name = item.params_content
          }
        })
      }
      if (arr.quote_params?.length) {
        arr.quote_params.forEach((item: any) => {
          if (item.params_type == 'gear_percent' || item.params_type == 'percent') {
            item.name = item.params_content + '%'
          } else if (item.params_type == 'radio' || item.params_type == 'checkbox') {
            let arr: any = []
            item.params_content.forEach((items: any) => {
              arr.push(items?.text[local.lang])
            })
            item.name = arr.join(',')
          } else {
            item.name = item.params_content
          }
        })
      }
    })
  }
  tableData.list = data?.list || []
  tableData.count = data?.count
}
getDataList()

// 删除交易对手明细
const deleteOpponentBtn = async (val: any) => {
  const { code } = await apiWealth.apiWealthOrderCounterpartiesQuoteDelete({ 'id': val.id })
  if (code != 1) return;
  getDataList()
}
// 编辑添加
const allForm: any = ref({
  end_price: '',
  exercise_time: '',
  contract_income: '',
  counterparties_id: '',
  counterparties_update_id: '',
  deal_nominal_principal: 0,
  cost_price: 0,
  deal_time: '',
})
const onClose = () => {
  allForm.value.counterparties_update_id = ''
  formRef.value.resetFields()
}
const editOpponentBtn = (val: any) => {
  allForm.value.counterparties_update_id = val.id
  allForm.value.deal_nominal_principal = Number(val.deal_nominal_principal)
  allForm.value.cost_price = Number(val.cost_price)
  allForm.value.deal_time = val.deal_time * 1000
  addOpponentShow.value = true
}
const rivalList = ref([{ name: '1', id: '2' }])
const getRivalList = async () => {
  const { code, data } = await apiWealth.apiWealthCounterpartiesList({ 'filter[status]': 1 })
  if (code != 1) return;
  rivalList.value = data.list
};
getRivalList()
const addOpponentShow = ref(false)
const addOpponentBtn = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    if (allForm.value.counterparties_update_id) {
      const { code } = await apiWealth.apiWealthOrderCounterpartiesQuoteUpdate({
        id: allForm.value.counterparties_update_id,
        data: {
          deal_nominal_principal: allForm.value.deal_nominal_principal,
          cost_price: allForm.value.cost_price,
          deal_time: allForm.value.deal_time,
        }
      })
      if (code != 1) return false;
      getDataList()
      return true
    } else {
      const { code } = await apiWealth.apiWealthOrderCounterpartiesQuoteCreate({
        data: {
          order_id: dataAll.info?.id,
          counterparties_id: allForm.value.counterparties_id,
          deal_nominal_principal: allForm.value.deal_nominal_principal,
          cost_price: allForm.value.cost_price,
          deal_time: allForm.value.deal_time,
        }
      })
      if (code != 1) return false;
      getDataList()
      return true
    }
  }
  return false
}
// 公用
const identifying = ref(0)
const publicForm: any = ref({})
const publicVisibleTitle = ref('')
const publicVisibleShow = ref(false)
const disabledDate = (val: any) => {
  return dayjs(val).isBefore(dayjs())
}
const publicVisibleOpen = (num: any) => {
  if (num == 1) {
    publicForm.value.start_time = dayjs(dataAll.info?.start_time * 1000).format('YYYY-MM-DD'),
      publicForm.value.end_time = dayjs(dataAll.info?.end_time * 1000).format('YYYY-MM-DD'),
      publicForm.value.currency = dataAll.info?.currency
    publicForm.value.nominal_principal = Number(dataAll.info?.nominal_principal)
    publicVisibleTitle.value = t('order.detail.5umc2zz3tn40')
    identifying.value = 1
    getWealthOptionsProductInfo(dataAll.info?.options_product_info.id)
  } else if (num == 2) {
    identifying.value = 2
    getWealthOptionsProductInfo(dataAll.info?.options_product_info.id)
    publicVisibleTitle.value = t('order.detail.5umc2zz3tq80')
  }
  publicVisibleShow.value = true
}
const publicVisibleBtn: any = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    if (identifying.value == 1) {
      let message = ''
      let min = WealthOptionsProductInfo.value.nominal_principal_min
      let principal_setp = WealthOptionsProductInfo.value.nominal_principal_step
      let principal = Number(publicForm.value.nominal_principal)
      if (principal < 0) {
        message = t('order.detail.5umc2zz3tsw0')
      } else if ((principal) < Number(min)) {
        message = t('order.detail.5umc2zz3tvk0') + min
      } else if ((principal) > Number(min)) {
        let pattern = /\./
        let num = ((principal) - Number(min)) / Number(principal_setp)
        if (pattern.test(num + '')) {
          message = t('order.detail.5umc2zz3tys0') + principal_setp + t('order.detail.5umc2zz3u300')
        } else {
          message = ''
        }
      } else {
        message = ''
      }
      if (publicForm.value.end_time <= dayjs(new Date()).format('YYYY-MM-DD')) {
        formRef.value.setFields({
          end_time: {
            status: 'error',
            message: t('order.detail.5umc2zz3u8g0')
          }
        })
        return false
      } else if (publicForm.value.start_time > publicForm.value.end_time) {
        formRef.value.setFields({
          end_time: {
            status: 'error',
            message: t('order.detail.5umc2zz3ubk0')
          }
        })
        return false
      }
      if (message) {
        formRef.value.setFields({
          nominal_principal: {
            status: 'error',
            message: message
          }
        })
        return false
      } else {
        const { code } = await apiWealth.apiWealthOrderEdit({
          id: dataAll.info?.id,
          data: publicForm.value
        }
        )
        if (code != 1) return false;
        getData()
        return true
      }
    } else if (identifying.value == 2) {
      let param: any = {
        params_list: []
      }
      let bool = false
      let arr = [...WealthOptionsProductInfo.value.framework_params, ...WealthOptionsProductInfo.value.quote_params]
      arr.forEach((item: any) => {
        if (structureParameters.value[item.key] || item.config.required || structureParameters.value[item.key] == 0) {
          if (item.params_type == 'number') {
            if (structureParameters.value[item.key] > item.config.max) {
              bool = true
              let key: any = {}
              key[item.key] = {
                status: 'error',
                message: t('order.detail.5umc2zz3uek0') + item.config.max
              }
              formRef.value.setFields(key)

            } else if (structureParameters.value[item.key] < item.config.min) {
              bool = true
              let key: any = {}
              key[item.key] = {
                status: 'error',
                message: t('order.detail.5umc2zz3uj00') + item.config.min
              }
              formRef.value.setFields(key)
            } else if (!Number.isInteger(structureParameters.value[item.key])) {
              bool = true
              let key: any = {}
              key[item.key] = {
                status: 'error',
                message: t('order.detail.5umc2zz3ulw0')
              }
              formRef.value.setFields(key)
            }
          } else if (item.params_type == 'float' || item.params_type == 'percent') {
            let num = (structureParameters.value[item.key].toString().split('.')[1] || '').length
            if (structureParameters.value[item.key] > item.config.max) {
              bool = true
              let key: any = {}
              key[item.key] = {
                status: 'error',
                message: t('order.detail.5umc2zz3uek0') + item.config.max
              }
              formRef.value.setFields(key)
            } else if (structureParameters.value[item.key] < item.config.min) {
              bool = true
              let key: any = {}
              key[item.key] = {
                status: 'error',
                message: t('order.detail.5umc2zz3uj00') + item.config.min
              }
              formRef.value.setFields(key)
            } else if (num > item.config.precision) {
              bool = true
              let key: any = {}
              key[item.key] = {
                status: 'error',
                message: t('order.detail.5umc2zz3uow0') + item.config.precision + t('order.detail.5umc2zz3uro0')
              }
              formRef.value.setFields(key)
            }
          }
        }
      })
      if (bool) return false

      WealthOptionsProductInfo.value.framework_params.forEach((item: any) => {
        if (structureParameters.value[item.key]) {
          if (item.params_type == 'checkbox') {
            let arr: any = []
            structureParameters.value[item.key].forEach((items: any) => {
              arr.push({ key: items })
            })
            param.params_list.push({
              params_id: item.id,
              content: {
                selected: arr
              }
            })
          } else if (item.params_type == 'radio') {
            param.params_list.push({
              params_id: item.id,
              content: {
                selected: [{ key: structureParameters.value[item.key] }]
              }
            })
          } else if (item.params_type == 'gear_percent') {
            param.params_list.push({
              params_id: item.id,
              content: {
                value: Number(structureParameters.value[item.key].replace('%', ''))
              }
            })
          } else {
            param.params_list.push({
              params_id: item.id,
              content: {
                value: structureParameters.value[item.key]
              }
            })
          }
        }


      })
      WealthOptionsProductInfo.value.quote_params.forEach((item: any) => {
        if (structureParameters.value[item.key]) {
          if (item.params_type == 'checkbox') {
            let arr: any = []
            structureParameters.value[item.key].forEach((items: any) => {
              arr.push({ key: items })
            })
            param.params_list.push({
              params_id: item.id,
              content: {
                selected: arr
              }
            })
          } else if (item.params_type == 'radio') {
            param.params_list.push({
              params_id: item.id,
              content: {
                selected: [{ key: structureParameters.value[item.key] }]
              }
            })
          } else if (item.params_type == 'gear_percent') {
            param.params_list.push({
              params_id: item.id,
              content: {
                value: Number(structureParameters.value[item.key].replace('%', ''))
              }
            })
          } else {
            param.params_list.push({
              params_id: item.id,
              content: {
                value: structureParameters.value[item.key]
              }
            })
          }
        }


      })
      const { code } = await apiWealth.apiWealthOrderUpdateParamsContent({
        id: dataAll.info?.id,
        data: {
          params_list: param.params_list
        }
      }
      )
      if (code != 1) return false;
      getData()
      return true
    }

  }
  return false
}

const WealthOptionsProductInfo = ref()
const structureParameters: any = ref({})
const getWealthOptionsProductInfo = async (id: any) => {
  const { code, data } = await apiWealth.apiWealthOptionsProductInfo({ id: id })
  if (code != 1) return false;
  conditionData(data)
  WealthOptionsProductInfo.value = data

}
let currencyEnum: any = ref([])
const conditionData = (val: any) => {
  WealthOptionsProductInfo.value = val
  let currency = [
    { value: 'CNY', name: t('order.detail.5umc2zz3uuk0') },
    { value: 'HKD', name: t('order.detail.5umc2zz3uxc0') },
    { value: 'USD', name: t('order.detail.5umc2zz3v0k0') },
  ]
  currencyEnum.value = []
  val.currency_list.forEach((item: any) => {
    currency.forEach((items: any) => {
      if (item.currency == items.value) {
        currencyEnum.value.push({ value: items.value, name: items.name })
      }
    })
  })
  let arr1: any = []
  let arr2: any = []
  if (WealthOptionsProductInfo.value.framework_params && WealthOptionsProductInfo.value.framework_params?.length) {
    dataAll.info?.params_content.forEach((item: any) => {
      let obj = WealthOptionsProductInfo.value.framework_params.find((items: any) => items.id == item.params_id)
      if (obj) {
        arr1.push(obj)
      }
    })
    dataAll.info?.params_content.forEach((item: any) => {
      let obj = WealthOptionsProductInfo.value.quote_params.find((items: any) => items.id == item.params_id)
      if (obj) {
        arr2.push(obj)
      }
    })
    WealthOptionsProductInfo.value.framework_params = arr1
    WealthOptionsProductInfo.value.quote_params = arr2
    let arrAll = [...WealthOptionsProductInfo.value.framework_params, ...WealthOptionsProductInfo.value.quote_params]
    dataAll.info?.params_content.forEach((item: any) => {
      let obj = item.content
      obj = JSON.parse(obj)
      arrAll.forEach((val: any) => {
        if (item.params_id == val.id) {
          if (val.params_type == 'radio') {
            structureParameters.value[val.key] = obj.selected[0].key
          } else if (val.params_type == 'checkbox') {
            let arrs: any = []
            if (obj.selected?.length) {
              obj.selected.forEach((vals: any) => {
                arrs.push(vals.key)
              })
            }
            structureParameters.value[val.key] = arrs
          } else if (val.params_type == 'gear_percent') {
            structureParameters.value[val.key] = obj.value + '%'
          } else {
            if (Number(obj.value)) {
              structureParameters.value[val.key] = Number(obj.value)
            }
          }
        }
      })
    })
  }
}
// 档位选择
const structureGearVariable = ref([])
const structureKey = ref()
const structureGear = (val: any) => {
  const min = Number(val.config.min);
  const max = Number(val.config.max);
  const step = Number(val.config.step);
  const array: any = [];
  for (let i = min; i <= max; i += step) {
    if (val.params_type == 'gear_percent') {
      array.push(i + '%');
    } else {
      array.push(i);
    }
  }


  structureKey.value = val.key
  structureGearVariable.value = array

}
const validators = (value: any, cb: any) => {
  if (value && value > 0) {
    return true
  } else {
    cb(t('order.detail.5umc2zz3v3c0'))
  }
}
const validatorTime = (value: any, cb: any) => {
  if(publicForm.value.start_time > value){
    cb(t('order.detail.5umc2zz3ubk0'))
  }else if(value <= dayjs(new Date()).format('YYYY-MM-DD')){
    cb(t('order.detail.5umc2zz3u8g0'))
  }else{
    return true
  }
}

// 修改订单状态
const modifyStatusVisible = ref(false)
const allStatusForm: any = ref({
  status: '',
  create_position: 1,
  deal_nominal_principal: 0,
  cost_price: 0,
  deal_time: '',
  opening_price: 0,
  reason: '',
})
const modifyStatusModal = () => {
  for (let key in dataAll.info) {
    if (allStatusForm.value.hasOwnProperty(key) && dataAll.info?.hasOwnProperty(key)) {
      if (key == 'cost_price' || key == 'deal_nominal_principal' || key == 'opening_price') {
        allStatusForm.value[key] = Number(dataAll.info[key])
      } else {
        allStatusForm.value[key] = dataAll.info[key];
      }
    }
  }
  if (dataAll.info?.status == 0 || dataAll.info?.status == 4) {
    allStatusForm.value.status = 1
  }
  if (dataAll.info?.status == 1) {
    allStatusForm.value.status = 3
  }
  if (allStatusForm.value.deal_time == 0) {
    allStatusForm.value.deal_time = ''
  }
  console.log(allStatusForm.value);

  modifyStatusVisible.value = true
}
const modifyStatusBtn = async () => {
  const res = await formRef.value?.validate();

  if (!res) {
    let param: any = {}
    if (allStatusForm.value.status == '1') {
      param.status = allStatusForm.value.status
      param.freeze_price = allStatusForm.value.cost_price
    } else if (allStatusForm.value.status == '2' || allStatusForm.value.status == '3') {
      param = { ...allStatusForm.value }
      delete param.reason
    } else if (allStatusForm.value.status == '6') {
      param.status = allStatusForm.value.status
      param.reason = allStatusForm.value.reason
    } else {
      param = { ...allStatusForm.value }
    }
    if (allStatusForm.value.create_position != 1) {
      delete param.opening_price
    }
    const { code } = await apiWealth.apiWealthOrderUpdate({
      id: dataAll.info?.id,
      data: { ...param }
    })
    if (code != 1) return false;
    getData()
    return true
  }
  return false
}
const validator = (value: any, cb: any) => {
  let min = WealthOptionsProductInfo.value.nominal_principal_min
  let principal_setp = WealthOptionsProductInfo.value.nominal_principal_step
  let principal = Number(value)
  if (principal < 0) {
    cb(t('order.detail.5umc2zz3tsw0'))
  } else if ((principal) < Number(min)) {
    cb(t('order.detail.5umc2zz3tvk0') + min)
  } else if ((principal) > Number(min)) {
    let pattern = /\./
    let num = ((principal) - Number(min)) / Number(principal_setp)
    if (pattern.test(num + '')) {
      cb(t('order.detail.5umc2zz3tys0') + principal_setp + t('order.detail.5umc2zz3u300'))
    } else {
      return true
    }
  } else {
    return true
  }
}
</script>

<style lang="less" scoped>:deep(.arco-form-item-label-col > .arco-form-item-label) {
  color: var(--color-text-3);
}</style>