<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Thông tin chi tiết khách hàng
 -->
<template>
  <div class="form" ref="form">
    <div class="form-container" ref="formContainer">
      <!-- start header -->
      <div class="form-header">
        <div class="form-header-left">
          <div class="form-header-left-title">
            {{ title }}
          </div>

          <div class="form-header-left-radio">
            <!-- start là nhà tổ chức -->
            <base-input-radio
              v-for="(item, index) in isPersonal"
              :key="item.id"
              v-model="currentSupplier.isOrganization"
              :value="item.id"
              :checked="index == 0 ? true : false"
              :text="item.name"
              name="isPersonal"
              :id="item.field"
            >
            </base-input-radio>
          </div>

          <div class="form-header-left-checkbox">
            <!-- start Check box kiểm tra khách hàng -->
            <base-input-checkbox
              :checked="currentSupplier.isCustomer"
              @checked="currentSupplier.isCustomer = $event"
              text="Là khách hàng"
              id="khach-hang"
            >
            </base-input-checkbox>
            <!-- end Check box kiểm tra khách hàng -->
          </div>
        </div>
        <div class="form-header-right">
          <div v-tooltip="{ global: true, theme: { placement: 'bottom' } }">
            <base-button
              classButtonIcon="background-icon-close icon-24"
              @clickButton="handlerCloseForm"
              v-tooltip="'Đóng (ESC)'"
            >
            </base-button>
          </div>
        </div>
      </div>
      <!-- end header -->

      <!-- start content  -->
      <div class="form-content form-content-scroll">
        <!-- start form content top -->
        <div class="form-content-top">
          <!-- start form content top left -->
          <div class="form-content-top-left">
            <!-- start mã nhà cung cấp là cá nhân -->
            <base-input-text
              v-if="currentSupplier.isOrganization"
              class="w-60 p-r-12"
              fieldLabel="Mã nhà cung cấp"
              :iconRed="true"
              :isRequired="true"
              :isFormatText="false"
              v-model="currentSupplier.supplierCode"
              :errorText="
                listErrors.has('supplierCode')
                  ? listErrors.get('supplierCode')
                  : null
              "
              @errorText="
                $event
                  ? !listErrors.has('supplierCode')
                    ? listErrors.set('supplierCode', $event)
                    : ''
                  : listErrors.delete('supplierCode')
              "
              :checkFocus="fieldFocusValidate.supplierCode"
              @checkFocus="fieldFocusValidate.supplierCode = false"
            ></base-input-text>
            <!-- end mã nhà cung cấp là cá nhân -->

            <!-- start mã số thuế -->
            <base-input-text
              class="w-40"
              :class="{ 'p-r-12': !currentSupplier.isOrganization }"
              fieldLabel="Mã số thuế"
              v-model="currentSupplier.taxCode"
              :isFormatText="false"
              :width="140"
              :checkFocus="fieldFocusValidate.taxCode"
              @checkFocus="fieldFocusValidate.taxCode = false"
            ></base-input-text>
            <!-- end mã số thuế -->

            <!-- start mã nhà cung cấp -->
            <base-input-text
              v-if="!currentSupplier.isOrganization"
              class="w-60"
              fieldLabel="Mã nhà cung cấp"
              :iconRed="true"
              :isRequired="true"
              :isFormatText="false"
              v-model="currentSupplier.supplierCode"
              :errorText="
                listErrors.has('supplierCode')
                  ? listErrors.get('supplierCode')
                  : null
              "
              @errorText="
                $event
                  ? !listErrors.has('supplierCode')
                    ? listErrors.set('supplierCode', $event)
                    : ''
                  : listErrors.delete('supplierCode')
              "
              :checkFocus="fieldFocusValidate.supplierCode"
              @checkFocus="fieldFocusValidate.supplierCode = false"
            ></base-input-text>
            <!-- end mã nhà cung cấp -->

            <!-- start xưng hô -->
            <base-combobox-multiple
              v-if="currentSupplier.isOrganization"
              class="w-1/3 p-r-12 box-sizing-b vocative-combobox"
              placeholder="Xưng hô"
              :listField="FIELDS_TABLE_COMBOBOX_VOCATIVE"
              v-model="currentSupplier.supplierVocativeName"
              :listData="LIST_VOCATIVE"
              fieldName="Xưng hô"
              :iconSum="false"
              :isMultiple="false"
              :isFormatText="true"
            >
            </base-combobox-multiple>
            <!-- end xưng hô -->

            <!-- start tên nhà cung cấp -->
            <base-input-text
              class="w-100"
              :class="{ 'w-2/3': currentSupplier.isOrganization }"
              fieldLabel="Tên nhà cung cấp"
              v-model="currentSupplier.supplierName"
              :iconRed="true"
              :isRequired="true"
              :isFormatText="true"
              :errorText="
                listErrors.has('supplierName')
                  ? listErrors.get('supplierName')
                  : null
              "
              @errorText="
                $event
                  ? !listErrors.has('supplierName')
                    ? listErrors.set('supplierName', $event)
                    : ''
                  : listErrors.delete('supplierName')
              "
              :checkFocus="fieldFocusValidate.supplierName"
              @checkFocus="fieldFocusValidate.supplierName = false"
            ></base-input-text>
            <!-- end tên nhà cung cấp -->

            <!-- start địa chỉ -->
            <base-textarea
              classText="input-container-field-label"
              class="w-100"
              text="Địa chỉ"
              textPlaceholder="VD: Số 82 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội"
              v-model="currentSupplier.supplierAddress"
            >
            </base-textarea>
            <!-- end địa chỉ -->
          </div>
          <!-- end form content top left -->

          <!-- start form content top right -->
          <div class="form-content-top-right">
            <!-- start điện thoại -->
            <base-input-text
              v-if="!currentSupplier.isOrganization"
              class="w-40 p-r-12"
              fieldLabel="Điện thoại"
              :isPhoneNumber="true"
              v-model="currentSupplier.supplierMobile"
              :isFormatText="false"
              :checkFocus="fieldFocusValidate.supplierMobile"
              @checkFocus="fieldFocusValidate.supplierMobile = false"
              :errorText="
                listErrors.has('supplierMobile')
                  ? listErrors.get('supplierMobile')
                  : null
              "
              @errorText="
                $event
                  ? !listErrors.has('supplierMobile')
                    ? listErrors.set('supplierMobile', $event)
                    : ''
                  : listErrors.delete('supplierMobile')
              "
            ></base-input-text>
            <!-- end điện thoại -->

            <!-- start website-->
            <base-input-text
              v-if="!currentSupplier.isOrganization"
              class="w-60"
              fieldLabel="Webbsite"
              v-model="currentSupplier.website"
              :isFormatText="true"
            ></base-input-text>
            <!-- end website -->

            <!-- start nhóm nhà cung cấp -->
            <base-combobox-multiple
              class="w-100"
              classText="input-container-field-label"
              fieldName="Nhóm nhà cung cấp"
              :iconSum="true"
              :listData="dataGroupSuppliers"
              :listField="FIELDS_TABLE_COMBOBOX_SUPPLIERS"
              v-model="test"
              :isMultiple="true"
              @clickIconSum="showGroupSupplier = true"
              @loadData="loadGroupSupplier($event)"
            >
            </base-combobox-multiple>
            <!-- end nhóm nhà cung cấp -->

            <!-- start nhân viên -->
            <base-combobox-multiple
              class="w-100"
              classText="input-container-field-label"
              fieldName="Nhân viên mua hàng"
              :listField="FIELDS_TABLE_COMBOBOX_EMPLOYEE"
              @clickIconSum="showEmployee = true"
              :listData="dataEmployees"
              :iconSum="true"
              :isMultiple="false"
              v-model="currentSupplier.employeeId"
              @loadData="loadEmployees($event)"
            >
            </base-combobox-multiple>
            <!-- end nhân viên -->
          </div>
          <!-- end form content top right -->
        </div>
        <!-- end form content top -->

        <!-- start content tabs -->
        <div class="form-content-tabs">
          <base-tabs>
            <base-tab title="Thông tin liên hệ" class="d-flex">
              <div
                :class="{
                  'w-1/2':
                    currentSupplier.isCustomer ||
                    currentSupplier.isOrganization,
                }"
                class="d-flex flex-grow-1"
              >
                <div class="tab-content-left flex-grow-1 w-1/2 p-r-26">
                  <div class="tab-content-text">
                    {{
                      currentSupplier.isOrganization
                        ? "Thông tin  liên hệ"
                        : "Người liên hệ"
                    }}
                  </div>

                  <div class="tab-content-left-input tab-content-input">
                    <!-- start xưng hô người liên hệ -->
                    <div class="w-1/3" v-if="!currentSupplier.isOrganization">
                      <base-combobox-multiple
                        class="p-r-6-5 vocative-combobox"
                        :listField="FIELDS_TABLE_COMBOBOX_VOCATIVE"
                        v-model="currentSupplier.supplierVocativeName"
                        placeholder="Xưng hô"
                        :listData="LIST_VOCATIVE"
                        :iconSum="false"
                        :isMultiple="false"
                      >
                      </base-combobox-multiple>
                    </div>
                    <!-- end xưng hô người liên hệ -->

                    <!-- start họ và tên người liên hệ -->
                    <div class="w-2/3" v-if="!currentSupplier.isOrganization">
                      <base-input-text
                        v-model="currentSupplier.supplierNameContact"
                        placeholder="Họ và tên"
                        :isFormatText="true"
                      ></base-input-text>
                    </div>
                    <!-- end họ và tên người liên hệ -->

                    <!-- Start email -->
                    <div class="w-100">
                      <base-input-text
                        placeholder="Email"
                        :isEmail="true"
                        v-model="currentSupplier.supplierEmailContact"
                        :checkFocus="fieldFocusValidate.supplierEmailContact"
                        @checkFocus="
                          fieldFocusValidate.supplierEmailContact = false
                        "
                        :errorText="
                          listErrors.has('supplierEmailContact')
                            ? listErrors.get('supplierEmailContact')
                            : null
                        "
                        @errorText="
                          $event
                            ? !listErrors.has('supplierEmailContact')
                              ? listErrors.set('supplierEmailContact', $event)
                              : ''
                            : listErrors.delete('supplierEmailContact')
                        "
                        :isFormatText="false"
                      ></base-input-text>
                    </div>
                    <!-- end email -->

                    <!-- Start số điện thoại -->
                    <div class="w-1/2" v-if="!currentSupplier.isOrganization">
                      <base-input-text
                        v-model="currentSupplier.userMobileElectronicBill"
                        placeholder="Số điện thoại"
                        :isPhoneNumber="true"
                        :checkFocus="
                          fieldFocusValidate.userMobileElectronicBill
                        "
                        @checkFocus="
                          fieldFocusValidate.userMobileElectronicBill = false
                        "
                        :errorText="
                          listErrors.has('userMobileElectronicBill')
                            ? listErrors.get('userMobileElectronicBill')
                            : null
                        "
                        @errorText="
                          $event
                            ? !listErrors.has('userMobileElectronicBill')
                              ? listErrors.set(
                                  'userMobileElectronicBill',
                                  $event
                                )
                              : ''
                            : listErrors.delete('userMobileElectronicBill')
                        "
                      ></base-input-text>
                    </div>
                    <!-- end số điện thoại -->

                    <!-- Start Điện thoại di động -->
                    <div
                      class="w-1/2 p-r-6-5"
                      v-if="currentSupplier.isOrganization"
                    >
                      <base-input-text
                        :isPhoneNumber="true"
                        placeholder="Điện thoại di động"
                        v-model="currentSupplier.supplierPhoneNumberContact"
                        :checkFocus="
                          fieldFocusValidate.supplierPhoneNumberContact
                        "
                        @checkFocus="
                          fieldFocusValidate.supplierPhoneNumberContact = false
                        "
                        :errorText="
                          listErrors.has('supplierPhoneNumberContact')
                            ? listErrors.get('supplierPhoneNumberContact')
                            : null
                        "
                        @errorText="
                          $event
                            ? !listErrors.has('supplierPhoneNumberContact')
                              ? listErrors.set(
                                  'supplierPhoneNumberContact',
                                  $event
                                )
                              : ''
                            : listErrors.delete('supplierPhoneNumberContact')
                        "
                      ></base-input-text>
                    </div>
                    <!-- end điện thoại di động -->

                    <!-- Start Điện thoại cố định -->
                    <div
                      class="w-1/2 p-r-6-5"
                      v-if="currentSupplier.isOrganization"
                    >
                      <base-input-text
                        :isPhoneNumber="true"
                        v-model="currentSupplier.supplierMobile"
                        placeholder="Điện thoại cố định"
                        :checkFocus="fieldFocusValidate.supplierMobile"
                        @checkFocus="fieldFocusValidate.supplierMobile = false"
                        :errorText="
                          listErrors.has('supplierMobile')
                            ? listErrors.get('supplierMobile')
                            : null
                        "
                        @errorText="
                          $event
                            ? !listErrors.has('supplierMobile')
                              ? listErrors.set('supplierMobile', $event)
                              : ''
                            : listErrors.delete('supplierMobile')
                        "
                      ></base-input-text>
                    </div>
                    <!-- end điện thoại cố định -->
                  </div>
                </div>

                <div
                  class="tab-content-right flex-grow-1 w-1/2"
                  :class="{
                    'p-r-26': isShowCustomer || !currentSupplier.isOrganization,
                  }"
                >
                  <div class="tab-content-text">Đại diện theo pháp luật</div>

                  <div class="tab-content-right-input tab-content-input">
                    <div class="w-100">
                      <base-input-text
                        v-model="currentSupplier.legaRrepresentative"
                        placeholder="Đại diện theo pháp luật"
                        :isFormatText="true"
                      ></base-input-text>
                    </div>
                  </div>
                </div>
              </div>

              <!-- start Thông tin CMND/Thẻ căn cước -->
              <div
                :class="{ 'w-1/2': currentSupplier.isOrganization }"
                class="tab-content-employee flex-grow-1"
                v-if="currentSupplier.isOrganization"
              >
                <div class="tab-content-text">Thông tin CMND/Thẻ căn cước</div>

                <div class="tab-content-left-input tab-content-input">
                  <div class="w-1/2 p-r-6-5">
                    <base-input-text
                      v-model="currentSupplier.idNo"
                      placeholder="Số CMND/Thẻ căn cước"
                    ></base-input-text>
                  </div>

                  <div class="w-1/2 p-r-6-5 p-b-6-5">
                    <el-date-picker
                      type="date"
                      v-model="currentSupplier.issueOn"
                      placeholder="Ngày cấp"
                      format="DD/MM/YYYY"
                    />
                  </div>

                  <div class="w-100">
                    <base-input-text
                      v-model="currentSupplier.placeOfIssue"
                      placeholder="Nơi cấp"
                      :isFormatText="true"
                    ></base-input-text>
                  </div>
                </div>
              </div>
              <!-- end thông tin CMND/THẻ căn cước-->

              <!-- start người nhận hóa đơn điện tử -->
              <div
                :class="{ 'w-1/2': currentSupplier.isCustomer }"
                class="tab-content-employee flex-grow-1"
                v-else-if="currentSupplier.isCustomer"
              >
                <div class="tab-content-text">Người nhận hóa đơn điện tử</div>

                <div class="tab-content-left-input tab-content-input">
                  <div class="w-100">
                    <base-input-text
                      v-model="currentSupplier.userNameElectronicBill"
                      placeholder="Họ và tên"
                      :isFormatText="true"
                    ></base-input-text>
                  </div>

                  <div class="w-100">
                    <base-input-text
                      v-model="currentSupplier.userEmailElectronicBill"
                      placeholder='Email, ngăn cách nhiều email bởi dấu chấm phẩy ";"'
                      :isEmail="true"
                      :checkFocus="fieldFocusValidate.userEmailElectronicBill"
                      @checkFocus="
                        fieldFocusValidate.userEmailElectronicBill = false
                      "
                      :errorText="
                        listErrors.has('userEmailElectronicBill')
                          ? listErrors.get('userEmailElectronicBill')
                          : null
                      "
                      @errorText="
                        $event
                          ? !listErrors.has('userEmailElectronicBill')
                            ? listErrors.set('userEmailElectronicBill', $event)
                            : ''
                          : listErrors.delete('userEmailElectronicBill')
                      "
                      :isFormatText="false"
                    ></base-input-text>
                  </div>

                  <div class="w-1/2">
                    <base-input-text
                      v-model="currentSupplier.userMobileElectronicBill"
                      placeholder="Số điện thoại"
                      :isPhoneNumber="true"
                    ></base-input-text>
                  </div>
                </div>
              </div>
              <!-- end người nhận hóa đơn điện tử -->
            </base-tab>

            <base-tab title="Điều khoản thanh toán" class="flex-wrap">
              <!-- Start điều khoản thanh toán -->
              <div class="w-200 p-r-12">
                <base-combobox-multiple
                  fieldName="Điều khoản thanh toán"
                  :iconSum="true"
                  :isMultiple="false"
                  :listData="dataRulePayments"
                  v-model="currentSupplier.rulePaymentId"
                  :listField="FIELDS_TABLE_COMBOBOX_RULE_PAYMENTS"
                  @clickIconSum="showRulePay = true"
                  @loadData="loadRulePayments($event)"
                >
                </base-combobox-multiple>
              </div>
              <!-- end điều khoản thanh toán -->

              <!-- Start Số ngày được nợ -->
              <div class="w-200 p-r-12">
                <base-input-text
                  :isNumber="true"
                  v-model="currentSupplier.dayOwed"
                  fieldLabel="Số ngày được nợ"
                ></base-input-text>
              </div>
              <!-- end số ngày được nợ -->

              <!-- Start Số nợ tối đa -->
              <div class="w-200 p-r-12">
                <base-input-text
                  :isNumber="true"
                  v-model="currentSupplier.debitAmountMax"
                  fieldLabel="Số nợ tối đa"
                ></base-input-text>
              </div>
              <!-- end số nwoj tối đa -->

              <!-- Start tài khoản công nợ phải thu -->
              <div class="w-200 p-r-12" v-if="currentSupplier.isCustomer">
                <base-combobox-multiple
                  fieldName="Tài khoản công nợ phải thu"
                  :listField="FIELDS_TABLE_COMBOBOX_ACCOUNTS_RECEIABLE"
                  :iconSum="false"
                  :isMultiple="false"
                  :listData="dataAccountsReceiable"
                  v-model="currentSupplier.accountReceivableId"
                  @loadData="loadAccountsReceiable($event)"
                >
                </base-combobox-multiple>
              </div>
              <!-- end tài khoản công nợ phải thu -->

              <!-- Start ttài khoản công nợ phải trả -->
              <div class="w-200 p-r-12">
                <base-combobox-multiple
                  fieldName="Tài khoản công nợ phải trả"
                  :listField="FIELDS_TABLE_COMBOBOX_ACCOUNTS_PAYABLE"
                  :iconSum="false"
                  :isMultiple="false"
                  :listData="dataAccountsPayable"
                  v-model="currentSupplier.accountPayableId"
                  @loadData="loadAccountsPayable($event)"
                >
                </base-combobox-multiple>
              </div>
              <!-- end tài khoản công nợ phải trả -->
            </base-tab>

            <base-tab title="Tài khoản ngân hàng">
              <base-bank-account
                v-model="currentSupplier.bankAccountIds"
                @data="dataBankAccount = $event"
              ></base-bank-account>
            </base-tab>

            <base-tab title="Địa chỉ khác" class="d-flex">
              <div class="w-1/2 p-r-26">
                <div class="tab-content-text">Vị trí địa lý</div>

                <div
                  class="
                    tab-content-left-input tab-content-input
                    flex-wrap
                    d-flex
                  "
                >
                  <!-- Start quốc gia -->
                  <div
                    class="w-1/2 p-r-12 box-sizing-b p-b-12 vocative-combobox"
                  >
                    <base-combobox-multiple
                      :iconSum="false"
                      :isTHead="false"
                      :isMultiple="false"
                      placeholder="Quốc gia"
                      :listField="FIELDS_TABLE_COMBOBOX_ADDRESS"
                      :listData="LIST_COUNTRY"
                      v-model="currentSupplier.supplierCountry"
                    >
                    </base-combobox-multiple>
                  </div>
                  <!-- end quốc gia -->

                  <!-- Start tỉnh/thành phố -->
                  <div class="w-1/2 p-b-12 vocative-combobox">
                    <base-combobox-multiple
                      :iconSum="false"
                      :isTHead="false"
                      :isMultiple="false"
                      :listField="FIELDS_TABLE_COMBOBOX_ADDRESS_TWO"
                      :listData="dataProvince"
                      v-model="currentSupplier.supplierCity"
                      placeholder="Tỉnh/Thành phố"
                    >
                    </base-combobox-multiple>
                  </div>
                  <!-- end tỉnh/thành phố -->

                  <!-- Start Quận/Huyện -->
                  <div
                    class="w-1/2 p-r-12 box-sizing-b p-b-12 vocative-combobox"
                  >
                    <base-combobox-multiple
                      :iconSum="false"
                      :isTHead="false"
                      :isMultiple="false"
                      :listField="FIELDS_TABLE_COMBOBOX_ADDRESS"
                      :listData="dataDistricts"
                      v-model="currentSupplier.supplierDistrict"
                      placeholder="Quận/Huyện"
                    >
                    </base-combobox-multiple>
                  </div>
                  <!-- end Quận/Huyện -->

                  <!-- Start Xã/Phường -->
                  <div class="w-1/2 p-b-12 vocative-combobox">
                    <base-combobox-multiple
                      :iconSum="false"
                      :isTHead="false"
                      :isMultiple="false"
                      :listField="FIELDS_TABLE_COMBOBOX_ADDRESS_TWO"
                      :listData="dataWards"
                      v-model="currentSupplier.supplierWard"
                      placeholder="Xã/Phường"
                    >
                    </base-combobox-multiple>
                  </div>
                  <!-- end Xã/Phường -->
                </div>
              </div>
              <div class="w-1/2">
                <!-- start content title địa chỉ giao hàng -->
                <div class="tab-content-title">
                  <div class="tab-content-text">Địa chỉ giao hàng</div>
                  <div class="tab-content-other">
                    <base-input-checkbox
                      text="Giống địa chỉ nhà cung cấp"
                      id="supplier-address"
                    >
                    </base-input-checkbox>
                  </div>
                </div>
                <!-- end content title địa chỉ giao hàng -->
                <table>
                  <!-- start textarea địa chỉ giao hàng -->
                  <tbody>
                    <tr v-for="i in rowDeliveryAddress" :key="i">
                      <td style="width: 350px">
                        <base-textarea
                          v-model="litsDeliveryAddress[i]"
                          :height="31"
                        ></base-textarea>
                      </td>
                      <td style="width: 40px">
                        <div
                          v-tooltip="{
                            global: false,
                            theme: { placement: 'bottom-right' },
                          }"
                        >
                          <base-button
                            class="background-unset"
                            classButtonIcon="background-icon background-position-delete w-h-16 d-flex"
                            v-tooltip="'Ctrl + Delete'"
                            @clickButton="
                              deleteItemDeliveryAddress(litsDeliveryAddress[i])
                            "
                          ></base-button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- end textarea địa chỉ giao hàng -->

                <div class="tab-content-control">
                  <base-button
                    class="icon-mr-10"
                    v-tooltip="'Ctrl + Insert'"
                    listClass="button-white"
                    text="Thêm dòng"
                    :frontSize="12"
                    :height="24"
                    @clickButton="insertItemDeliveryAddress"
                  ></base-button>

                  <base-button
                    listClass="button-white"
                    text="Xóa hết dòng"
                    :frontSize="12"
                    :height="24"
                    @clickButton="removeItemDeliveryAddress"
                  ></base-button>
                </div>
              </div>
            </base-tab>

            <base-tab title="Ghi chú">
              <base-textarea
                v-model="currentSupplier.supplierDescription"
                text="Ghi chú"
                :height="190"
              ></base-textarea>
            </base-tab>
          </base-tabs>
        </div>
        <!-- end content tabs -->
      </div>
      <!-- end content -->

      <!-- start bottom -->
      <div class="form-bottom">
        <div class="form-bottom-right">
          <base-button
            v-tooltip="'Cất và thêm(Ctrl + Shift +S)'"
            @clickButton="handlerUpdateData(FUNCTION_UPLOAD.SaveAndInsert)"
            text="Cất và thêm"
          >
          </base-button>
          <base-button
            classButton="button-white"
            v-tooltip="'Cất(Ctrl + S)'"
            @clickButton="handlerUpdateData(FUNCTION_UPLOAD.Save)"
            style="margin: 0 0.75rem"
            text="Cất"
          >
          </base-button>
        </div>

        <div class="form-buttom-left">
          <base-button
            classButton="button-white"
            @clickButton="$emit('closeForm', false)"
            text="Hủy"
          >
          </base-button>
        </div>
      </div>
      <!-- end bottom -->
    </div>

    <!-- start hiển thị form thêm nhóm nhà cung cấp, khách hàng -->
    <group-supplier
      v-if="showGroupSupplier"
      @closeForm="showGroupSupplier = $event"
      @textToastMessage="emit('textToastMessage', $event)"
      @typeToastMessage="emit('typeToastMessage', $event)"
    ></group-supplier>
    <!-- end hiển thị form thêm nhóm nhà cung cấp, khách hàng -->

    <!-- start hiển thị form thêm nhân viên -->
    <employee-detail
      v-if="showEmployee"
      @closeForm="showEmployee = $event"
    ></employee-detail>
    <!-- end hiển thị form nhân viên -->

    <!-- start form thêm điều khoản thanh toán -->
    <rule-payment
      v-if="showRulePay"
      @closeForm="showRulePay = $event"
    ></rule-payment>
    <!-- end form thêm điều khoản thanh toán -->

    <!-- start thông báo -->
    <base-notify
      @closeForm="handlerCloseNotifi"
      @checkShowNotify="checkNotify.isShow = $event"
      v-if="checkNotify.isShow"
      :type="checkNotify.type"
      :text="checkNotify.text"
      :fieldNameFocus="firstFocus"
      @checkFocusCloseNotify="checkFocusCloseNotify($event)"
      @sayYes="$event == true ? handlerUpdateData(FUNCTION_UPLOAD.Save) : ''"
    ></base-notify>
    <!-- end thông báo -->

    <!-- end content -->
  </div>
</template>

<script>
import {
  FIELDS_TABLE_COMBOBOX_EMPLOYEE,
  LIST_TABS_SUPPLIERS,
  FIELDS_HEADER_LEFT_SUPPLIER_DETAIL,
  FIELDS_BACKACCOUNT,
  RULE_FORM_SUPPLIER_DETAIL,
  LIST_VOCATIVE,
  FIELDS_TABLE_COMBOBOX_VOCATIVE,
  FIELDS_TABLE_COMBOBOX_SUPPLIERS,
  FIELDS_TABLE_COMBOBOX_RULE_PAYMENTS,
  FIELDS_TABLE_COMBOBOX_ACCOUNTS_RECEIABLE,
  FIELDS_TABLE_COMBOBOX_ACCOUNTS_PAYABLE,
  FIELDS_TABLE_COMBOBOX_ADDRESS,
  FIELDS_TABLE_COMBOBOX_ADDRESS_TWO,
  LIST_COUNTRY,
  STATUS_CODES,
  FUNCTION_UPLOAD,
  TEXT_TOAST_MESSAGE,
  NOTIFY_LIST,
  NOTIFY_TEXT,
  FIELDS_SUPPLIERS_REQUIRED,
} from "../../../js/constants.js";

import { createGuid } from "../../../js/GuidId.js";

import { address } from "../../../js/Controllers/AddressController.js";

import GroupSupplier from "../../group-supplier/GroupSupplier";

import { groupSuppliers } from "../../../js/Controllers/GroupSuppliersController.js";

import { reluPayments } from "../../../js/Controllers/RulePaymentsController.js";

import { employees } from "../../../js/Controllers/EmployeesController.js";

import { accountsPayable } from "../../../js/Controllers/AccountsPayableController.js";

import { accountsReceivable } from "../../../js/Controllers/AccountsReceivableController.js";

import EmployeeDetail from "../../employees/employees-detail/EmployeeDetail";

import RulePayment from "../../rule-payment/RulePayment";

import {
  supplierModel,
  suppliers,
} from "../../../js/Controllers/SuppliersController.js";
/**
 * Author: Phạm Văn Đạt(12/12/2022)
 * Function: nhúng các các hằng số
 */

export default {
  components: { GroupSupplier, EmployeeDetail, RulePayment },
  name: "SupplierDetail",

  setup() {},

  props: {
    // title form
    title: {
      Type: String,
      default: null,
    },

    // thông tin chi tiết nhà cung cấp
    supplierDetail: {
      Type: Object,
      default: null,
    },
  },
  data() {
    return {

      test: [
        "707de3be-287e-1d9c-9928-186a78c3f39e",
        "3247100d-5018-5366-7440-2c126cc94c2f"
      ],

      //chuỗi hiển thị thông báo
      NOTIFY_TEXT,

      // các trường cần kiểm tra null
      FIELDS_SUPPLIERS_REQUIRED,

      // kiểm tra notify
      checkNotify: {
        isShow: false,
        type: null,
        text: null,
      },

      TEXT_TOAST_MESSAGE,
      // lấy tên trường đầu tiên có lỗi
      firstFocus: null,

      // chức năng form: cất, cất và thêm
      FUNCTION_UPLOAD,

      // danh sách địa chỉ giao hàng
      litsDeliveryAddress: [],

      // HIỂN THỊ QUỐC GIA TRONG COMBOBOX
      FIELDS_TABLE_COMBOBOX_ADDRESS,

      FIELDS_TABLE_COMBOBOX_ADDRESS_TWO,

      // dữ liệu các quốc gia
      LIST_COUNTRY,

      // danh sách tỉnh/TP
      dataProvince: [],

      // danh sách quận/huyện
      dataDistricts: [],

      // danh sách các phường
      dataWards: [],

      // các trường hiển thị tài khoản công nợ phải trả
      FIELDS_TABLE_COMBOBOX_ACCOUNTS_RECEIABLE,

      // các trường hiển thị tài khoản công nwoj phải thu
      FIELDS_TABLE_COMBOBOX_ACCOUNTS_PAYABLE,

      // dữ liệu điều khoản thanh toán
      dataRulePayments: [],

      // hiển thị dữ liệu điều khoản thanh toán trong bảng điều khoản thanh toán
      FIELDS_TABLE_COMBOBOX_RULE_PAYMENTS,

      // hiển thị dữ liệu trong bảng NCC con
      FIELDS_TABLE_COMBOBOX_SUPPLIERS,

      // danh sách nhà cung cấp, khách hàng
      dataGroupSuppliers: [],

      // danh sách nhân viên
      dataEmployees: [],

      // danh sách tài khoản công nợ phải trả
      dataAccountsPayable: [],

      //  danh sách tài khoản công nợ phải thu
      dataAccountsReceiable: [],

      // mảng lưu các nhóm nhà cung cấp, khách hàng đã chọn
      listDataGroupSupplier: [],

      // dữ liệu xưng hô
      LIST_VOCATIVE,

      // model dữ liệu xưng hô
      FIELDS_TABLE_COMBOBOX_VOCATIVE,

      // mảng lưu các lỗi đã có: { field: String, message: String} : chứa object này
      listErrors: new Map(),

      // các trường hiển thị nhân viên trong bảng
      FIELDS_TABLE_COMBOBOX_EMPLOYEE,

      // các trường hiển thị tab trong bảng chi tiết nhân viên
      fieldTabSuppliers: LIST_TABS_SUPPLIERS,

      // các trường của tài khoản ngân hàng
      fieldBankAccount: FIELDS_BACKACCOUNT,

      // hiển thị form thêm nhóm nhà cung cấp, khách hàng
      showGroupSupplier: false,

      // hiển thị form thêm mới nhân viên
      showEmployee: false,

      // hiển thị form thêm mới điều khoản thanh toán
      showRulePay: false,

      // số cột trong địa chỉ giao hàng
      rowDeliveryAddress: 0,

      // dữ liệu mới của tài khoản ngân hàng
      dataBankAccount: null,

      // check là cá nhân hay không
      isPersonal: FIELDS_HEADER_LEFT_SUPPLIER_DETAIL,

      // các nhân viên được chọn
      listSelectEmployee: [],

      // title form chi tiết nhà cung cấp
      RULE_FORM_SUPPLIER_DETAIL,

      // thông tin chi tiết nhà cung cấp hiện tại
      currentSupplier: supplierModel,

      // các trường check focus
      fieldFocusValidate: {
        // mã số thuế
        taxCode: true,

        // mã nhà cung cấp
        supplierCode: false,

        // tên nhà cung cấp
        supplierName: false,

        // điện thoại
        supplierMobile: false,

        //nhóm nhà cung cấp
        listDataGroupSupplier: false,

        //nhân viên mua hàng
        employeeId: false,

        // email
        supplierEmailContact: false,

        // email người nhận hóa đơn điện tử
        userEmailElectronicBill: false,

        // số điện thoại người liên hệ
        userMobileElectronicBill: false,

        // điện thoại di động
        supplierPhoneNumberContact: false,

        // ngày cấp = > không vượt quá ngày hiện tại
        issueOn: false,

        // điều khoản thanh toán
        rulePaymentId: false,

        // tài khoản công nợ phải thu
        accountReceivableId: false,

        // tài khoản công nợ phải trả
        accountPayableId: false,

        // quốc gia
        supplierCountry: false,

        // tỉnh/ thành phố
        supplierCity: false,

        // quận/ huyện
        supplierDistrict: false,

        // xã phường
        supplierWard: false,
      },

      // thứ tự hiển thị lỗi
      numericalOrder: [
        "taxCode",
        "supplierCode",
        "supplierName",
        "supplierMobile",
        "listDataGroupSupplier",
        "employeeId",
        "supplierEmailContact",
        "userEmailElectronicBill",
        "userMobileElectronicBill",
        "supplierPhoneNumberContact",
        "issueOn",
        "rulePaymentId",
        "accountReceivableId",
        "accountPayableId",
        "supplierCountry",
        "supplierCity",
        "supplierDistrict",
        "supplierWard",
      ],
    };
  },
  async created() {
    // lấy data của nhóm nhà cung cấp, khách hàng
    this.dataGroupSuppliers =
      groupSuppliers.currentData != undefined ? groupSuppliers.currentData : [];

    // lấy data của nhân viên
    this.dataEmployees =
      employees.currentData != undefined ? employees.currentData : [];

    // lấy data của nhân viên
    this.dataRulePayments =
      reluPayments.currentData != undefined ? reluPayments.currentData : [];

    //lấy thông tin chi tiết khách hàng
    await this.selectInfoSupplierDetail();
  },
  methods: {
    /**
     * Author: Phạm Văn Đạt(22/12/2022)
     * Function: XỬ lý focus vào lỗi đầu tiên nếu như có lỗi
     */
    checkFocusCloseNotify(value) {
      console.log(value);

      Object.keys(this.fieldFocusValidate).forEach((key) => {
        if (
          this.fieldFocusValidate[key] !=
          this.fieldFocusValidate[this.firstFocus]
        ) {
          this.fieldFocusValidate[key] = false;
        }
      });

      // chuyển trạng thái focus true ở lỗi đầu tiên
      this.fieldFocusValidate[this.firstFocus] = true;

      console.log(this.fieldFocusValidate);
      console.log(this.firstFocus);
    },

    /**
     * Author: Phạm Văn Đạt(22/12/2022)
     * Function: Xử lý lấy lỗi đầu tiên trong mảng lỗi
     */
    selectErrorTextFirst() {
      // lấy lỗi theo thứ tự: mã, tên, phòng ban
      for (let i = 0; i < this.numericalOrder.length; i++) {
        if (this.listErrors.has(this.numericalOrder[i])) {
          // lấy tên trường đầu tiên có lỗi
          this.firstFocus = this.numericalOrder[i];

          console.log(this.listErrors.get(this.numericalOrder[i]));

          return this.listErrors.get(this.numericalOrder[i]);
        }
      }
      return null;
    },

    /**
     * Author: Phạm Văn Đạt(22/12/2022)
     * Function: Xử lý validate dữ liệu khi click nút cất, cất và thêm
     */
    valiDateRequired() {
      try {
        // xử lý bấm nút cất, cất và thêm validate các lỗi required
        FIELDS_SUPPLIERS_REQUIRED.forEach((value) => {
          // kiểm tra giá trị có null không
          if (!this.currentSupplier[value.fielName]) {
            // thêm tên trường và message lỗi vào danh sách lỗi nếu chưa có lỗi đó
            if (!this.listErrors.has(value.fielName)) {
              this.listErrors.set(
                value.fielName,
                NOTIFY_TEXT.requiredField(value.fieldText)
              );
            }

            // nếu chưa lấy trường nào thì mới nhận dữ liệu
            this.firstFocus = value.fielName;
          }
        });
      } catch (e) {
        this.$emit("textToastMessage", TEXT_TOAST_MESSAGE.Error.text);
        this.$emit("typeToastMessage", TEXT_TOAST_MESSAGE.Error.type);
      }
    },

    /**
     * Author: Phạm Văn Đạt(22/12/2022)
     * Function: Xử lý thêm hoặc cất và thêm dữ liệu nhà cung cấp
     * @param {*} functionUpload : chức năng thêm, cất hoặc thêm
     */
    async handlerUpdateData(functionUpload) {
      try {
        // xử lý validate dữ liệu
        this.valiDateRequired();

        console.log(this.listErrors);

        // nếu không có lỗi => thực hiện thêm hoặc update
        if (this.listErrors.size == 0) {
          let result;

          //kiểm tra xem cất || cất và thêm
          if (functionUpload == this.FUNCTION_UPLOAD.Save) {
            console.log("Thêm nhà cung cấp");

            // lấy guid mới
            this.currentSupplier.supplierID = createGuid();

            // gọi api thêm mới dữ liệu
            result = await suppliers.insertSupplier(this.currentSupplier);
            console.log(result);

            // kiểm tra thêm mới thành công hay không
          } else {
            console.log("Cất và thêm và thêm");
            // gọi api thêm mới dữ liệu
            result = await suppliers.updateSupplier(this.currentSupplier);
          }

          // thêm mới || cập nhật thất bại
          if (result?.statusCode == STATUS_CODES.Code400) {
            this.$emit("textToastMessage", result.message);
            this.$emit("typeToastMessage", result.message);
          } else if (result?.statusCode == STATUS_CODES.Code201) {
            console.log("thêm mới thành công");
          } else if (result?.statusCode == STATUS_CODES.Code200) {
            console.log("cập nhật thành công");
          }
          console.log(result.data);

          console.log(this.currentSupplier);

          // lấy id nhóm nhà cung cấp => thêm riêng
          console.log(this.listDataGroupSupplier);

          // lấy thông tin tài khoản ngân hàng => thêm riêng
          console.log(this.dataBankAccount);
        } else {
          // nếu có lỗi => xử lý hiển thị lỗi

          // chuyển map về dạng value, lấy phân tử đầu tiên hiển thị lên thông báo
          let valueText = this.selectErrorTextFirst();
          // hiển thị lỗi đầu tiên lên thông báo lỗi
          // gán lại giá trị notifi
          if (valueText != null) {
            this.checkNotify = {
              isShow: true,
              type: NOTIFY_LIST.ErrorValidate.type,
              text: NOTIFY_LIST.ErrorValidate.text(valueText),
            };
          }
        }

        this.listDataGroupSupplier = [];
      } catch (e) {
        console.log(e);
        this.$emit("textToastMessage", TEXT_TOAST_MESSAGE.Error.text);
        this.$emit("typeToastMessage", TEXT_TOAST_MESSAGE.Error.type);
      }
    },

    /**
     * Author: Phạm Văn Đạt(22/12/2022)
     * Function: Xử lý xóa hết dữ liệu trong địa chỉ giao hàng
     */
    removeItemDeliveryAddress() {
      try {
        this.litsDeliveryAddress = [];
        this.rowDeliveryAddress = 0;
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(22/12/2022)
     * Function: Xử lý xóa item trong địa chỉ giao hàng
     * @param {*} item: item địa chỉ giao hàng bị xóa
     */
    deleteItemDeliveryAddress(item) {
      try {
        console.log(item);
        const index = this.litsDeliveryAddress.findIndex(
          (word) => word == item
        );

        if (index != null) {
          this.litsDeliveryAddress.splice(index, 1);
          this.rowDeliveryAddress--;
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(19/12/2022)
     * Function: Xử lý click thêm địa chỉ giao hàng
     */
    insertItemDeliveryAddress() {
      try {
        this.litsDeliveryAddress = [...this.litsDeliveryAddress, null];
        this.rowDeliveryAddress++;
        console.log(this.litsDeliveryAddress);
        console.log(this.rowDeliveryAddress);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(19/12/2022)
     * Function: Xử lý load lại dữ liệu nhóm nhà cung cấp
     * @param {*} checkLoad : true | false
     */
    async loadGroupSupplier(checkLoad) {
      try {
        if (checkLoad) {
          if (this.dataGroupSuppliers.length > 0) {
            groupSuppliers.currentPageNumber++;
          }

          console.log("load nhóm khách hàng");

          if (this.dataGroupSuppliers.length <= groupSuppliers.totalCount) {
            await groupSuppliers.pagingGroupSupplier([]);

            if (groupSuppliers.currentData) {
              this.dataGroupSuppliers = [...groupSuppliers.currentData];
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(19/12/2022)
     * Function: Xử lý load lại dữ liệu nhân viên
     * @param {*} checkLoad : true | false
     */
    async loadEmployees(checkLoad) {
      try {
        if (checkLoad) {
          if (this.dataEmployees.length > 0) {
            groupSuppliers.currentPageNumber++;
          }

          if (this.dataEmployees.length <= employees.totalCount) {
            console.log("load nhân viên");

            await employees.pagingEmployee([]);

            if (employees.currentData) {
              this.dataEmployees = [...employees.currentData];
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(20/12/2022)
     * Function: Xử lý load lại dữ liệu tài khoản công nợ phải trả
     * @param {*} checkLoad : true | false
     */
    async loadAccountsPayable(checkLoad) {
      try {
        if (checkLoad) {
          if (this.dataAccountsPayable.length > 0) {
            accountsPayable.currentPageNumber++;
          }

          if (this.dataAccountsPayable.length <= accountsPayable.totalCount) {
            console.log("load nhân viên");

            await accountsPayable.pagingAccountsPayable([]);

            if (accountsPayable.currentData) {
              this.dataAccountsPayable = [...accountsPayable.currentData];
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(20/12/2022)
     * Function: Xử lý load lại dữ liệu tài khoản công nợ phải thu
     * @param {*} checkLoad : true | false
     */
    async loadAccountsReceiable(checkLoad) {
      try {
        if (checkLoad) {
          if (this.dataAccountsReceiable.length > 0) {
            accountsReceivable.currentPageNumber++;
          }

          if (
            this.dataAccountsReceiable.length <= accountsReceivable.totalCount
          ) {
            console.log("load nhân viên");

            await accountsReceivable.pagingAccountsReceivable([]);

            if (accountsReceivable.currentData) {
              this.dataAccountsReceiable = [...accountsReceivable.currentData];
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(19/12/2022)
     * Function: Xử lý load lại dữ liệu điều khoản thanh toán
     * @param {*} checkLoad : true | false
     */
    async loadRulePayments(checkLoad) {
      try {
        if (checkLoad) {
          if (this.dataRulePayments.length > 0) {
            reluPayments.currentPageNumber++;
          }

          if (this.dataRulePayments.length <= reluPayments.totalCount) {
            console.log("load điều khoản thanh toán");

            await reluPayments.pagingRulePayments([]);

            if (reluPayments.currentData) {
              this.dataRulePayments = [...reluPayments.currentData];
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author:  Phạm Văn Đạt(19/12/2022)
     * Function: lấy thông tin chi tiết khách hàng
     */
    async selectInfoSupplierDetail() {
      try {
        if (this.supplierDetail == null) {
          this.currentSupplier = supplierModel;

          // hiển thị loading
          console.log("hiển thị loading");
          let result = await suppliers.getMaxCode();

          // ẩn loading
          console.log("ẩn loading");

          this.currentSupplier.supplierCode = result;
        } else {
          this.currentSupplier = this.supplierDetail;
        }

        // lấy danh sách địa chỉ giao hàng
        this.litsDeliveryAddress =
          this.currentSupplier.deliveryAddress != null
            ? this.currentSupplier.deliveryAddress.split(";")
            : [];

        //  lấy số cột hiển thị địa chỉ giao hàng
        this.rowDeliveryAddress = this.litsDeliveryAddress.length;

        this.listDataGroupSupplier = [];
        // lấy thông tin nhóm nhà cung cấp => chuyển về mảng
        this.listDataGroupSupplier =
          this.currentSupplier.groupSupplierIds != null
            ? this.currentSupplier.groupSupplierIds.split(";")
            : [];

        // nếu có id thì phải lấy item để so sánh
        if (this.currentSupplier.groupSupplierIds) {
          console.log("load nhóm nhà cung cấp");
          this.loadGroupSupplier(true);
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đath(14/12/2022)
     * Function: Xử lý ẩn form
     */
    handlerCloseForm() {
      try {
        this.$emit("closeForm", false);
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    supplierDetail(value) {
      console.log(value);
    },

    listDataGroupSupplier: {
      handler(newValue) {
        console.log(newValue);
      },
      deep: true,
    },

    showGroupSupplier(value) {
      console.log(value);
    },

    /**
     * Author: Phạm Văn Đạt(23/12/2022)
     * Function: Xử lý lấy focusđầu tiên
     * @param {*} value : true| false
     */
    "currentSupplier.isOrganization"(value) {
      try {
        console.log(value);
        if (value) {
          this.firstFocus = "supplierCode";
          this.checkFocusCloseNotify();
        } else {
          this.firstFocus = "taxCode";
          this.checkFocusCloseNotify();
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(22/12/2022)
     * Function: theo dõi quốc gia
     * @param {*} value : giá trị text quốc gia
     */
    async "currentSupplier.supplierCountry"(value) {
      try {
        let arrItem = LIST_COUNTRY.filter((item) => item.name == value);

        if (arrItem.length > 0) {
          console.log(value);

          // lấy danh sách tỉnh/ thành phố
          let result = await address.getAllProvince();

          if (result?.status == STATUS_CODES.Code200) {
            this.dataProvince = result?.data;
          }
          console.log(this.dataProvince);
        } else {
          this.dataProvince = [];
          this.dataDistricts = [];
          this.dataWards = [];
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(22/12/2022)
     * Function: theo dõi Tỉnh/TP
     * @param {*} value : giá trị text tỉnh/TP
     */
    async "currentSupplier.supplierCity"(value) {
      try {
        if (value != []) {
          let arrItem = this.dataProvince.filter((item) => item.name == value);

          console.log(arrItem[0].code);

          if (arrItem.length > 0) {
            console.log(value);

            // lấy danh sách tỉnh/ thành phố
            let result = await address.getAllDistricts(arrItem[0].code);

            console.log(result);

            if (result?.status == STATUS_CODES.Code200) {
              this.dataDistricts = result?.data.districts;
            }

            console.log(this.dataDistricts);
          }
        } else {
          this.dataDistricts = [];
          this.dataWards = [];
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(22/12/2022)
     * Function: theo dõi Tỉnh/TP
     * @param {*} value : giá trị text tỉnh/TP
     */
    async "currentSupplier.supplierDistrict"(value) {
      try {
        if (value != []) {
          let arrItem = this.dataDistricts.filter((item) => item.name == value);

          console.log(arrItem[0].code);

          if (arrItem.length > 0) {
            console.log(value);

            // lấy danh sách tỉnh/ thành phố
            let result = await address.getAllWards(arrItem[0].code);

            console.log(result);

            if (result?.status == STATUS_CODES.Code200) {
              this.dataWards = result?.data.wards;
            }

            console.log(this.dataWards);
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
@import url(SupplierDetail.css);
</style>
