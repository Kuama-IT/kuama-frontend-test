package net.kuama.test.data.network

import net.kuama.test.data.models.PaymentDetails
import retrofit2.http.GET

interface NetworkApi {

   @GET("data.json")
   suspend fun getJson() : PaymentDetails
}