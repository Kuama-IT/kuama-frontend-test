package net.kuama.test.presentation

import android.content.Context
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.databinding.ObservableArrayList
import androidx.databinding.ObservableArrayMap
import androidx.databinding.ObservableBoolean
import androidx.databinding.ObservableField
import androidx.lifecycle.ViewModel
import com.google.gson.JsonObject
import net.kuama.test.data.PaymentRepository
import net.kuama.test.data.models.PaymentModel
import java.lang.ref.WeakReference

class MainViewModel(private val repository: PaymentRepository) : ViewModel() {

   private var weakContext = WeakReference<Context>(null)

   /* These observables will automatically update the activity view and populate the data*/
   val showFormLayout = ObservableBoolean(false)
   val showFieldsLayout = ObservableBoolean(false)
   val paymentFieldsJson = ObservableArrayMap<String, String>()
   val beneficiaryDetailsFields = ObservableArrayMap<String, String>()
   val paymentTypesSpinnerList : ObservableArrayList<String> = ObservableArrayList()
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
         paymentsList = repository.getData(ctx)?.paymentsType
         populateData()
         return
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
   }

   fun onDropDownItemSelected(item: String) {
      selectedEntityType = item
      showFormLayout.set(item != "None")
      showEntityDetails()
      onTabSelected(selectedPaymentType)
   }

   private fun showEntityDetails() {
      try {
         paymentsList?.first {it.BeneficiaryEntityType == selectedEntityType }?.also {
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
}