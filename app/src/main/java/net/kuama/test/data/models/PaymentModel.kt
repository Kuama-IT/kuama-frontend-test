package net.kuama.test.data.models

import com.google.gson.JsonObject
import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class PaymentModel(

   @SerializedName("payment_type")
   @Expose
   val paymentType: String,

   @SerializedName("beneficiary_entity_type")
   @Expose
   val BeneficiaryEntityType: String,

   @SerializedName("fields")
   @Expose
   val paymentFields: JsonObject
)