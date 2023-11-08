<template>
  <div class="wrap">
    <Breadcrumb />
    <a-card class="generalCard">
      <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
      <a-card :loading="loading" style="margin-bottom:15px">
        <template #title>
          <div style="display: flex;justify-content: space-between;">
            <a-space :size="18">
              {{$t('inquiry.detail.5umbja7re380')}}
            </a-space>
          </div>
        </template>
        <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('inquiry.detail.5umbja7sgx00')">
                {{ dataAll.info?.inquiry_no || '-' }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('inquiry.detail.5umbja7t3j80')">
                {{ dataAll.info.create_time ? dayjs.unix(dataAll.info.create_time).format('YYYY-MM-DD HH:mm:ss') : '-' }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('inquiry.detail.5umbja7t4sc0')">
                {{ useEnumsFormat('wealth.transaction.inquiryRecord.status', dataAll.info?.status) }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('inquiry.detail.5umbja7t65g0')">
                {{ dataAll.info.quote_time ? dayjs.unix(dataAll.info.quote_time).format('YYYY-MM-DD HH:mm:ss') : $t('inquiry.detail.5umbja7t6sw0') }}
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-card :loading="loading" style="margin-bottom:15px" v-if="dataAll.info?.status == 3">
        <template #title>
          <div style="display: flex;justify-content: space-between;">
            <a-space :size="18">
              {{$t('inquiry.detail.5umbja7t78s0')}}
            </a-space>
          </div>
        </template>
        <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item label="">
                {{ dataAll.info?.reason[local.lang] || '-' }}
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-card :loading="loading" style="margin-bottom:15px">
        <template #title>
          <div style="display: flex;justify-content: space-between;">
            <a-space :size="18">
              {{$t('inquiry.detail.5umbja7t7no0')}}
            </a-space>
          </div>
        </template>
        <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('inquiry.detail.5umbja7t85o0')">
                {{ dataAll.info?.symbol_name }} {{ dataAll.info?.symbol }}.{{ dataAll.info?.market ? useEnumsFormat('market.market', dataAll.info?.market) : '' }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('inquiry.detail.5umbja7tgdc0')">
                {{ dataAll.info?.options_product_info?.product_name }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('inquiry.detail.5umbja7thts0')">
                {{ $numberFormat(dataAll.info?.nominal_principal) }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('inquiry.detail.5umbja7tilg0')">
                {{ dataAll.info?.currency }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('inquiry.detail.5umbja7titc0')">
                {{ dataAll.info?.period }}{{ $t('inquiry.detail.5umbja7tj040') }}
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-card :loading="loading" style="margin-bottom:15px">
        <template #title>
          <div style="display: flex;justify-content: space-between;">
            <a-space :size="18">
              {{$t('inquiry.detail.5umbja7tj680')}}
            </a-space>
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
              -
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-card :loading="loading" style="margin-bottom:15px">
        <template #title>
          <div style="display: flex;justify-content: space-between;">
            <a-space :size="18">
              {{$t('inquiry.detail.5umbja7tjbw0')}}
            </a-space>
          </div>
        </template>
        <p style="margin-bottom:15px">{{$t('inquiry.detail.5umbja7tjhs0')}}</p>
        <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('inquiry.detail.5umbja7thts0')">
                {{ dataAll.info?.quote_nominal_principal != 0 ? $numberFormat(dataAll.info?.quote_nominal_principal / 10000) + $t('inquiry.detail.5umbja7tjng0') :
                  '-'
                }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6" v-for="item in dataAll.info?.quote_params">
              <a-form-item :label="item?.params_name">
                {{ item?.name }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('inquiry.detail.5umbja7tjto0')">
                {{ dataAll.info.quote_end_time ? dayjs.unix(dataAll.info.quote_end_time).format('YYYY-MM-DD HH:mm:ss') :
                  '-'
                }}
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-card :loading="loading" style="margin-bottom:15px">
        <template #title>
          <div style="display: flex;justify-content: space-between;">
            <a-space :size="18">
              {{$t('inquiry.detail.5umbja7tk3k0')}}
            </a-space>
          </div>
        </template>
        <div style="margin-bottom:16px">
          <a-button v-permission="['wealthInquiryCounterpartiesQuoteCreate']" type="primary" @click="giveVisibleBtn(2)">
            <template #icon>
              <icon-plus />
            </template>
            {{$t('inquiry.detail.5umbja7tkag0')}}
          </a-button>
          <span style="margin-left:10px">{{$t('inquiry.detail.5umbja7tkfg0')}}</span>
        </div>
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
              <a-table-column :title="$t('inquiry.detail.5umbja7tkl80')" data-index="counterparties_info.name"></a-table-column>

              <a-table-column :title="$t('inquiry.detail.5umbja7tjbw0')">
                <template #cell="{ record }">
                  <a-tooltip :content="$t('inquiry.detail.5umbja7tkqg0')" position="right">
                    <template #content>
                      <p style="margin:0" v-for="item in record.quote_params">{{ item.params_name }}:
                        {{ item.name }}</p>
                    </template>
                    <a-link>{{$t('inquiry.detail.5umbja7tkvg0')}}</a-link>
                  </a-tooltip>
                </template>
              </a-table-column>
              <a-table-column :title="$t('inquiry.detail.5umbja7t65g0')">
                <template #cell="{ record }">
                  <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '' }}
                  </div>
                  <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '' }}</div>
                </template>
              </a-table-column>
              <a-table-column :title="$t('inquiry.detail.5umbja7tjto0')">
                <template #cell="{ record }">
                  <div>{{ dayjs.unix(record.end_time).format('YYYY-MM-DD') }}</div>
                  <div>{{ dayjs.unix(record.end_time).format('HH:mm:ss') }}</div>
                </template>
              </a-table-column>

              <a-table-column fixed="right" :title="$t('inquiry.detail.5umbja7tl0o0')" :width="150"
                v-if="$permission(['wealthInquiryCounterpartiesQuoteUpdate', 'wealthInquiryCounterpartiesQuoteDelete'])">
                <template #cell="{ record }">
                  <a-space>
                    <a-button v-permission="['wealthInquiryCounterpartiesQuoteUpdate']" style="padding-left: 0;"
                      type="text" @click="giveVisibleBtn(3, record)" size="small">
                      {{ $t('inquiry.detail.5umbja7tl5c0') }}
                    </a-button>
                    <a-popconfirm position="left" @ok="deleteOpponentBtn(record)" :content="$t('inquiry.detail.5umbo5wrfbw0')">
                      <a-button v-permission="['wealthInquiryCounterpartiesQuoteDelete']" type="text" status="danger"
                        size="small">
                        {{ $t('inquiry.detail.5umbja7tl9s0') }}
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
              {{$t('inquiry.detail.5umbja7tm540')}}
            </a-space>
          </div>
        </template>
        <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('inquiry.detail.5umbja7tmqg0')">
                {{ dataAll.info?.asset_account_info?.account }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('inquiry.detail.5umbja7tnj40')">
                {{ dataAll.info?.asset_account_info?.real_name }}
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item :label="$t('inquiry.detail.5umbja7to280')">
                {{ dataAll.info?.asset_account_info?.english_name }}
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-card :loading="loading" style="margin-bottom:15px">
        <template #title>
          <div style="display: flex;justify-content: space-between;">
            <a-space :size="18">
              {{$t('inquiry.detail.5umbja7tl0o0')}}
            </a-space>
          </div>
        </template>
        <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
          <a-row :gutter="16">
              <div v-if="dataAll.info?.status == '0' || dataAll.info?.status == '1'">
                <a-button v-permission="['wealthInquiryQuote']" @click="giveVisibleBtn(1)" type="primary"
                  v-if="dataAll.info?.status == '0'">
                  {{ $t('inquiry.detail.5umbja7tol40') }}
                </a-button>
                <a-popconfirm position="top" @ok="withdrawBtn" :content="$t('inquiry.detail.5umbo5wrig40')">
                  <a-button v-permission="['wealthInquiryCancelQuote']" type="primary" status="danger"
                    v-if="dataAll.info?.status == '1'">
                    {{ $t('inquiry.detail.5umbja7wsy00') }}
                  </a-button>
                </a-popconfirm>
                <a-button v-permission="['wealthInquirySetInvalid']" style="margin-left:10px" @click="loseVisible = true">
                  {{ $t('inquiry.detail.5umbja7wtjk0') }}
                </a-button>
              </div>
              <div v-else style="color:#999">
                {{$t('inquiry.detail.5umbja7wtok0')}}
              </div>
          </a-row>
        </a-form>
      </a-card>
    </a-card>
    <a-modal :mask-closable=false v-model:visible="giveVisible" :on-before-ok="handleOk" @close="onClose">
      <template #title>
        {{ giveVisibleNum == 1 ? $t('inquiry.detail.5umbja7tol40') : giveVisibleNum == 2 ? $t('inquiry.detail.5umbja7wts40') : $t('inquiry.detail.5umbja7wtvg0') }}
      </template>
      <div>
        <a-form ref="formRef" :model="structureParameters" layout="vertical">
          <a-form-item v-if="giveVisibleNum == 2" field="counterparties_id" :label="$t('inquiry.detail.5umbja7wtz00')"
            :rules="[{ required: true, message: $t('inquiry.detail.5umbja7wu2g0') }]" :validate-trigger="['change', 'input']">
            <a-select v-model="structureParameters.counterparties_id" :placeholder="$t('inquiry.detail.5umbja7wuao0')">
              <a-option v-for="item of rivalList" :value="item.id" :label="item.name" />
            </a-select>
          </a-form-item>
          <a-form-item field="quote_nominal_principal" :label="$t('inquiry.detail.5umbja7thts0')" :rules="[{ required: true, message: $t('inquiry.detail.5umbja7wu2g0') },
          { match: /^\d+(\.\d+)?$/, message: $t('inquiry.detail.5umbja7wueg0') }, { validator: validator }]">
            <a-input-number hide-button v-model="structureParameters.quote_nominal_principal" :placeholder="$t('inquiry.detail.5umbja7wui80')">
              <template #suffix>
                <span>
                  {{ giveVisibleNum == 1 ? $t('inquiry.detail.5umbja7tjng0') : '' }} {{ dataAll.info?.currency }}
                </span>
              </template>
            </a-input-number>
          </a-form-item>
          <template v-if="giveVisibleNum == 3">
            <template v-for="item in WealthOptionsProductInfo?.quote_paramsEdit">
              <a-form-item v-if="item.params_type == 'checkbox'" :field="item?.key" :label="item.params_name[local.lang]"
                :rules="item.config.required ? [{ required: true, message: $t('inquiry.detail.5umbja7wu2g0') }] : []">
                <a-select :limit="item.config.max" multiple @click="structureGear(item)"
                  v-model="structureParameters[item.key]" :placeholder="$t('inquiry.detail.5umbja7wuao0')">
                  <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
                </a-select>
              </a-form-item>
              <a-form-item v-else-if="item.params_type == 'radio'" :field="item?.key"
                :label="item.params_name[local.lang]"
                :rules="item.config.required ? [{ required: true, message: $t('inquiry.detail.5umbja7wu2g0') }] : []">

                <a-select v-model="structureParameters[item.key]" :placeholder="$t('inquiry.detail.5umbja7wuao0')">
                  <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
                </a-select>
              </a-form-item>
              <a-form-item v-else-if="item.params_type == 'gear_number'" :field="item?.key"
                :label="item.params_name[local.lang]"
                :rules="item.config.required ? [{ required: true, message: $t('inquiry.detail.5umbja7wu2g0') }] : []">

                <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('inquiry.detail.5umbja7wuao0')">
                  <a-option v-for="items of structureGearVariable">{{ items }}</a-option>
                </a-select>
              </a-form-item>
              <a-form-item v-else-if="item.params_type == 'gear_percent'" :field="item?.key"
                :label="item.params_name[local.lang]"
                :rules="item.config.required ? [{ required: true, message: $t('inquiry.detail.5umbja7wu2g0') }] : []">

                <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('inquiry.detail.5umbja7wuao0')">
                  <a-option v-for="items of structureGearVariable">{{ items }}</a-option>
                </a-select>
              </a-form-item>
              <a-form-item v-else-if="item.params_type == 'percent'" :field="item?.key"
                :rules="item.config.required ? [{ required: true, message: $t('inquiry.detail.5umbja7wu2g0') }] : []"
                :label="item.params_name[local.lang]">
                <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]"
                  :placeholder="$t('inquiry.detail.5umbja7wui80')">
                  <template #append>%</template>
                </a-input-number>
              </a-form-item>
              <a-form-item v-else-if="item.params_type == 'float'"
                :rules="item.config.required ? [{ required: true, message: $t('inquiry.detail.5umbja7wu2g0') }, { match: /^-?\d+(\.\d+)?$/, message: $t('inquiry.detail.5umbja7wulg0') }] : []"
                :field="item?.key" :label="item.params_name[local.lang]">
                <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]"
                  :placeholder="$t('inquiry.detail.5umbja7wui80')">
                </a-input-number>
              </a-form-item>
              <a-form-item v-else :field="item?.key"
                :rules="item.config.required ? [{ required: true, message: $t('inquiry.detail.5umbja7wu2g0') }, { match: /^-?\d+(\.\d+)?$/, message: $t('inquiry.detail.5umbja7wulg0') }] : []"
                :label="item.params_name[local.lang]">
                <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]"
                  :placeholder="$t('inquiry.detail.5umbja7wui80')">
                </a-input-number>
              </a-form-item>
            </template>
          </template>
          <template v-else>
            <template v-for="item in WealthOptionsProductInfo?.quote_params">
              <a-form-item v-if="item.params_type == 'checkbox'" :field="item?.key" :label="item.params_name[local.lang]"
                :rules="item.config.required ? [{ required: true, message: $t('inquiry.detail.5umbja7wu2g0') }] : []">
                <a-select :limit="item.config.max" multiple @click="structureGear(item)"
                  v-model="structureParameters[item.key]" :placeholder="$t('inquiry.detail.5umbja7wuao0')">
                  <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
                </a-select>
              </a-form-item>
              <a-form-item v-else-if="item.params_type == 'radio'" :field="item?.key"
                :label="item.params_name[local.lang]"
                :rules="item.config.required ? [{ required: true, message: $t('inquiry.detail.5umbja7wu2g0') }] : []">

                <a-select v-model="structureParameters[item.key]" :placeholder="$t('inquiry.detail.5umbja7wuao0')">
                  <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
                </a-select>
              </a-form-item>
              <a-form-item v-else-if="item.params_type == 'gear_number'" :field="item?.key"
                :label="item.params_name[local.lang]"
                :rules="item.config.required ? [{ required: true, message: $t('inquiry.detail.5umbja7wu2g0') }] : []">

                <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('inquiry.detail.5umbja7wuao0')">
                  <a-option v-for="items of structureGearVariable">{{ items }}</a-option>
                </a-select>
              </a-form-item>
              <a-form-item v-else-if="item.params_type == 'gear_percent'" :field="item?.key"
                :label="item.params_name[local.lang]"
                :rules="item.config.required ? [{ required: true, message: $t('inquiry.detail.5umbja7wu2g0') }] : []">

                <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('inquiry.detail.5umbja7wuao0')">
                  <a-option v-for="items of structureGearVariable">{{ items }}</a-option>
                </a-select>
              </a-form-item>
              <a-form-item v-else-if="item.params_type == 'percent'" :field="item?.key"
                :rules="item.config.required ? [{ required: true, message: $t('inquiry.detail.5umbja7wu2g0') }] : []"
                :label="item.params_name[local.lang]">
                <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]"
                  :placeholder="$t('inquiry.detail.5umbja7wui80')">
                  <template #append>%</template>
                </a-input-number>
              </a-form-item>
              <a-form-item v-else-if="item.params_type == 'float'"
                :rules="item.config.required ? [{ required: true, message: $t('inquiry.detail.5umbja7wu2g0') }, { match: /^-?\d+(\.\d+)?$/, message: $t('inquiry.detail.5umbja7wulg0') }] : []"
                :field="item?.key" :label="item.params_name[local.lang]">
                <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]"
                  :placeholder="$t('inquiry.detail.5umbja7wui80')">
                </a-input-number>
              </a-form-item>
              <a-form-item v-else :field="item?.key"
                :rules="item.config.required ? [{ required: true, message: $t('inquiry.detail.5umbja7wu2g0') }, { match: /^-?\d+(\.\d+)?$/, message: $t('inquiry.detail.5umbja7wulg0') }] : []"
                :label="item.params_name[local.lang]">
                <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]"
                  :placeholder="$t('inquiry.detail.5umbja7wui80')">
                </a-input-number>
              </a-form-item>
            </template>
          </template>

          <a-form-item field="quote_end_time" :label="$t('inquiry.detail.5umbja7tjto0')" :rules="[{ required: true, message: $t('inquiry.detail.5umbja7wu2g0') }]">
            <div style="width: 100%;">
              <a-date-picker style="width: 100%;margin-bottom:10px" show-time
                :time-picker-props="{ defaultValue: '09:09:06' }" format="YYYY-MM-DD HH:mm:ss"
                v-model="structureParameters.quote_end_time" />
              <br>
              <div>
                <a-space>
                  <a-tag color="arcoblue" @click="timeBtn(5)">5{{$t('inquiry.detail.5umbm4ko0h80')}}</a-tag>
                  <a-tag color="arcoblue" @click="timeBtn(10)">10{{$t('inquiry.detail.5umbm4ko0h80')}}</a-tag>
                  <a-tag color="arcoblue" @click="timeBtn(15)">15{{$t('inquiry.detail.5umbm4ko0h80')}}</a-tag>
                  <a-tag color="arcoblue" @click="timeBtn(20)">20{{$t('inquiry.detail.5umbm4ko0h80')}}</a-tag>
                  <a-tag color="arcoblue" @click="timeBtn(25)">25{{$t('inquiry.detail.5umbm4ko0h80')}}</a-tag>
                  <a-tag color="arcoblue" @click="timeBtn(30)">30{{$t('inquiry.detail.5umbm4ko0h80')}}</a-tag>
                </a-space>
              </div>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <a-modal :mask-closable=false v-model:visible="loseVisible" :on-before-ok="handleLose" @close="onCloseLose">
      <template #title>
        {{$t('inquiry.detail.5umbja7wus00')}}
      </template>
      <div style="margin-bottom:15px">
        <p style="margin-bottom:10px">{{$t('inquiry.detail.5umbja7wuvk0')}}</p>
        <a-textarea style="flex:1;" :auto-size="{
          minRows: 3,
          maxRows: 5
        }" v-model="reason['zh-CN']" :placeholder="$t('inquiry.detail.5umbja7wui80')" />
      </div>
      <div style="margin-bottom:15px">
        <p style="margin-bottom:10px">{{$t('inquiry.detail.5umbja7wuzo0')}}</p>
        <a-textarea style="flex:1;" :auto-size="{
          minRows: 3,
          maxRows: 5
        }" v-model="reason['en']" :placeholder="$t('inquiry.detail.5umbja7wui80')" />
      </div>
      <div style="margin-bottom:15px">
        <p style="margin-bottom:10px">{{$t('inquiry.detail.5umbja7wv2w0')}}</p>
        <a-textarea style="flex:1;" :auto-size="{
          minRows: 3,
          maxRows: 5
        }" v-model="reason['tc']" :placeholder="$t('inquiry.detail.5umbja7wui80')" />
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
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
const tableData = reactive({
  list: [],
  count: 0,
  message: [],
  loading: false
})
const searchInfo = reactive({
  show: false,
  data: {
    inquiry_id: route.params?.id,
    page: 1,
    per_page: 20
  }
})
const getDataList = async () => {
  tableData.loading = true
  const { code, data } = await apiWealth.apiWealthOptionsCounterpartiesQuoteList({
    ...useFilter(searchInfo.data)
  })
  tableData.loading = false
  if (code != 1) return;
  if (data.list?.length) {
    data.list.forEach((arr: any) => {
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


const getData = async () => {
  loading.value = true
  const { code, data } = await apiWealth.apiWealthInquiryInfo({
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
  getWealthOptionsProductInfo(dataAll.info?.options_product_info.id)
}
{
  getData()
}

// 给出报价
const giveVisibleNum = ref(0)
const giveVisible = ref(false)
const structureParameters: any = ref({
  quote_nominal_principal: 0,
  quote_end_time: '',
})
const giveVisibleBtn = (num: any, record?: any) => {
  giveVisibleNum.value = num
  if (num == 2) {
    Object.keys(structureParameters.value).forEach((item: any) => {
      structureParameters.value[item] = ''
    })
    getRivalList()
  } else if (num == 3) {
    Object.keys(structureParameters.value).forEach((item: any) => {
      structureParameters.value[item] = ''
    })
    let arr: any = []
    structureParameters.value.quote_nominal_principal = Number(record.nominal_principal)
    structureParameters.value.quote_end_time = dayjs(record.end_time * 1000).format('YYYY-MM-DD HH:mm:ss')
    structureParameters.value.id = record.id
    record.quote_params.forEach((item: any) => {
      WealthOptionsProductInfo.value.quote_params.forEach((items: any) => {
        if (item.params_id == items.id) {
          arr.push(items)
          if (item.params_type == 'radio') {
            structureParameters.value[items.key] = item.params_content[0].key
          } else if (item.params_type == 'checkbox') {
            if (item.params_content?.length) {
              structureParameters.value[items.key] = []
              item.params_content.forEach((value: any) => {
                structureParameters.value[items.key].push(value.key)
              })
            } else {
              structureParameters.value[items.key] = []
            }
          } else {
            if (Number(item.params_content)) {
              structureParameters.value[items.key] = Number(item.params_content)
            }
          }
          // structureParameters.value[items.key] = item.params_content
        }
      })
    })
    WealthOptionsProductInfo.value.quote_paramsEdit = arr

  }
  giveVisible.value = true
}
const handleOk = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    let param: any = {
      quote_nominal_principal: Number(structureParameters.value.quote_nominal_principal * 10000),
      quote_end_time: structureParameters.value.quote_end_time,
      params_list: []
    }
    let bool = false
    WealthOptionsProductInfo.value.quote_params.forEach((item: any) => {
      if (structureParameters.value[item.key] || item.config.required||structureParameters.value[item.key]==0) {
        if (item.params_type == 'number') {
          if (structureParameters.value[item.key] > item.config.max) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('inquiry.detail.5umbja7wv680') + item.config.max
            }
            formRef.value.setFields(key)

          } else if (structureParameters.value[item.key] < item.config.min) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('inquiry.detail.5umbja7wv9w0') + item.config.min
            }
            formRef.value.setFields(key)
          } else if (!Number.isInteger(structureParameters.value[item.key])) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('inquiry.detail.5umbja7wvdg0')
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
              message: t('inquiry.detail.5umbja7wv680') + item.config.max
            }
            formRef.value.setFields(key)
          } else if (structureParameters.value[item.key] < item.config.min) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('inquiry.detail.5umbja7wv9w0') + item.config.min
            }
            formRef.value.setFields(key)
          } else if (num > item.config.precision) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('inquiry.detail.5umbja7wvhk0') + item.config.precision + t('inquiry.detail.5umbja7wvkw0')
            }
            formRef.value.setFields(key)
          }
        }
      }
    })
    if (bool) return false
    if (WealthOptionsProductInfo.value?.quote_params) {
      WealthOptionsProductInfo.value?.quote_params.forEach((item: any) => {
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
    }

    if (giveVisibleNum.value == 2) {
      let obj: any = {
        counterparties_id: structureParameters.value.counterparties_id,
        inquiry_id: dataAll.info?.id,
        nominal_principal: Number(structureParameters.value.quote_nominal_principal),
        end_time: structureParameters.value.quote_end_time,
        params_list: param.params_list
      }
      const { code } = await apiWealth.apiWealthInquiryCounterpartiesQuoteCreate({
        data: obj
      });
      if (code != 1) return false;
      getDataList()
      return true

    } else if (giveVisibleNum.value == 3) {
      let obj: any = {
        nominal_principal: Number(structureParameters.value.quote_nominal_principal),
        end_time: structureParameters.value.quote_end_time,
        params_list: param.params_list
      }
      const { code } = await apiWealth.apiWealthInquiryCounterpartiesQuoteUpdate({
        id: structureParameters.value.id,
        data: obj
      });
      if (code != 1) return false;
      getDataList()
      getWealthOptionsProductInfo(dataAll.info?.options_product_info.id)
      return true
    } else {
      const { code } = await apiWealth.apiWealthInquiryQuote({
        id: dataAll.info?.id,
        data: param
      })
      if (code != 1) return false;
      getData()
      return true
    }

  }
  return false
}
const timeBtn = (val: any) => {
  let time = new Date()
  // if (structureParameters.value.quote_end_time) {
  //   time = new Date(structureParameters.value.quote_end_time)
  // } else {
  //   time = new Date()
  // }
  const newDateTime = new Date(time.getTime() + val * 60000);
  structureParameters.value.quote_end_time = dayjs(newDateTime).format("YYYY-MM-DD HH:mm:ss")
}
const onClose = () => {
  formRef.value.resetFields()
}
// 公司
const rivalList = ref([{ name: '1', id: '2' }])
const getRivalList = async () => {
  rivalList.value = []
  const res: any = await apiWealth.apiWealthCounterpartiesList({ 'filter[status]': 1 });
  if (res.code != 1) return Message.error(res.msg)
  rivalList.value = res.data.list
};

// 撤回报价
const withdrawBtn = async () => {
  const { code } = await apiWealth.apiWealthInquiryCancelQuote({
    id: route.params?.id,
  });
  if (code != 1) return;
  getData()
}
// 设置失效
const loseVisible = ref(false)
const reason = ref({
  'zh-CN': '',
  'en': '',
  'tc': '',
})
const handleLose = async () => {

  const res: any = await apiWealth.apiWealthInquirySetInvalid({
    id: route.params?.id,
    data: {
      reason: reason.value
    }
  });
  if (res.code != 1) {
    Message.error(res.msg)
    return false
  }
  getData()
  return true
}
const onCloseLose = () => {
  reason.value = {
    'zh-CN': '',
    'en': '',
    'tc': '',
  }
}

// 期权产品详情
const WealthOptionsProductInfo = ref()
const getWealthOptionsProductInfo = async (id: any) => {
  const { code, data } = await apiWealth.apiWealthOptionsProductInfo({ id: id })
  if (code != 1) return;
  conditionData(data)
  WealthOptionsProductInfo.value = data
}
const conditionData = (val: any) => {
  WealthOptionsProductInfo.value = val
  if (WealthOptionsProductInfo.value.quote_params && WealthOptionsProductInfo.value.quote_params?.length) {
    WealthOptionsProductInfo.value.quote_params.forEach((item: any) => {
      if (item.params_type == 'radio') {
        structureParameters.value[item.key] = item.config.selected
      } else if (item.params_type == 'checkbox') {
        if (item.config.selected) {
          structureParameters.value[item.key] = item.config.selected.split(',')
        } else {
          structureParameters.value[item.key] = []
        }
      } else {
        if (Number(item.config.value)) {
          structureParameters.value[item.key] = Number(item.config.value)
        }
      }
    });
  }
}
// 档位选择
const structureGearVariable = ref([])
const structureKey = ref()
const indexStructureGear = ref()
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
  let index = array.findIndex((item: any) => item == structureParameters.value[val.key])
  if (index == -1) {
    indexStructureGear.value = 0
  } else {
    indexStructureGear.value = index
  }

}
// 删除对手报价
const deleteOpponentBtn = async (val: any) => {
  const res: any = await apiWealth.apiWealthInquiryCounterpartiesQuoteDelete({
    id: val.id,
  });
  if (res.code != 1) return
  getDataList()
}
// value:any, cb:any
const validator = () => {
  // let min = WealthOptionsProductInfo.value.nominal_principal_min
  // let principal_setp = WealthOptionsProductInfo.value.nominal_principal_step
  // let principal = Number(value)
  // if (principal < 0) {
  //     cb('名义本金要大于0')
  //   } else if ((principal * 10000) < Number(min)) {
  //     cb('最小名义本金' + min)
  //   } else if ((principal * 10000) > Number(min)) {
  //     let pattern = /\./
  //     let num = ((principal * 10000) - Number(min)) / Number(principal_setp)
  //     if (pattern.test(num + '')) {
  //       cb('名义本金要以' + principal_setp + '递增')
  //     } else {
  //       return true
  //     }
  //   } else {
  //     return true
  //   }
  return true
}
</script>

<style lang="less" scoped>
:deep(.arco-form-item-label-col > .arco-form-item-label) {
  color: var(--color-text-3);
}
</style>