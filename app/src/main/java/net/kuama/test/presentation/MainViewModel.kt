package net.kuama.test.presentation

import android.content.Context
import androidx.activity.ComponentActivity
import androidx.databinding.ObservableArrayList
import androidx.databinding.ObservableArrayMap
import androidx.databinding.ObservableBoolean
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch
import net.kuama.test.R
import net.kuama.test.data.PaymentRepository
import net.kuama.test.data.models.PaymentModel
import net.kuama.test.view.utils.PreferencesKeys
import net.kuama.test.view.utils.getStringFromPreferences
import net.kuama.test.view.utils.showInputDialog
import net.kuama.test.view.utils.storeValueInSharedPreferences
import java.lang.ref.WeakReference

class MainViewModel(private val repository: PaymentRepository) : ViewModel() {

   private var weakContext = WeakReference<Context>(null)

   /* These observables will automatically update the activity view and populate the data*/
   val showFormLayout = ObservableBoolean(false)
   val showFieldsLayout = ObservableBoolean(false)
   val paymentFieldsJson = ObservableArrayMap<String, String>()
   val beneficiaryDetailsFields = ObservableArrayMap<String, String>()
   val paymentTypesSpinnerList: ObservableArrayList<String> = ObservableArrayList()
   val entityTypes = ObservableArrayList<String>()

   private var selectedPaymentType: String = ""
   private var selectedEntityType: String = "individual"

   private var paymentsList: List<PaymentModel>? = listOf()

   fun onActivityStart(activity: ComponentActivity) {
      weakContext = WeakReference(activity)
      fetchData()
   }


   private fun fetchData() {
      weakContext.get()?.let { ctx ->
         viewModelScope.launch {
            repository.getData(ctx).collect {
               paymentsList = it?.paymentsType
               populateData()
            }
         }
      }
   }

   private fun populateData() {
      val paymentTypes = paymentsList?.map { it.paymentType }?.distinct()
      paymentTypes?.let {
         paymentTypesSpinnerList.clear()
         paymentTypesSpinnerList.addAll(paymentTypes)
      }

      paymentsList?.map { it.BeneficiaryEntityType }?.distinct()?.let {
         entityTypes.clear()
         entityTypes.addAll(it)
      }
      showFieldsLayout.set(false)
      showFormLayout.set(false)
   }

   fun onDropDownItemSelected(item: String) {
      selectedEntityType = item
      showFormLayout.set(item != "None")
      showEntityDetails()
      onTabSelected(selectedPaymentType)
   }

   private fun showEntityDetails() {
      try {
         paymentsList?.first { it.BeneficiaryEntityType == selectedEntityType }?.also {
            beneficiaryDetailsFields.clear()
            val fields = it.paymentFields
            fields.keySet().forEach { key ->
               if (key.contains("name", true)) {
                  beneficiaryDetailsFields[key] = fields[key].asString
               }
            }
         }
      } catch (e: Exception) {
         e.printStackTrace()
      }
   }

   fun onTabSelected(item: String) {
      selectedPaymentType = item
      showFieldsLayout.set(true)
      showForm()
   }

   private fun showForm() {
      try {
         paymentsList?.first {
            it.paymentType == selectedPaymentType
                    && it.BeneficiaryEntityType == selectedEntityType
         }?.also {
            paymentFieldsJson.clear()
            val fields = it.paymentFields
            fields.keySet().forEach { key ->
               if (!key.contains("name", true)) {
                  paymentFieldsJson[key] = fields[key].asString
               }
            }
         }
      } catch (e: Exception) {
         e.printStackTrace()
      }
   }

   fun onToolbarMenuItemClicked(itemId: Int): Boolean {
      return when (itemId) {
         R.id.menu_url -> {
            val context = weakContext.get()
            val savedUrl = context?.getStringFromPreferences(PreferencesKeys.JSON_URL)
            context?.showInputDialog(R.string.change_url_dialog_title,
               R.string.change_url_dialog_msg, savedUrl) {
               context.storeValueInSharedPreferences(PreferencesKeys.JSON_URL, it)
            }
            true
         }
         R.id.menu_refresh -> {
            fetchData()
            true
         }
         else -> false
      }
   }

   fun onOnlineSwitchCheckedChanged(checked: Boolean) {
      weakContext.get()?.storeValueInSharedPreferences(PreferencesKeys.FETCH_TYPE, checked)
      fetchData()
   }

}