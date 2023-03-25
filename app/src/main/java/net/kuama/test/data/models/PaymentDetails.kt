package net.kuama.test.data.models

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class PaymentDetails(
   @SerializedName("details")
   @Expose
   val paymentsType: List<PaymentModel>)