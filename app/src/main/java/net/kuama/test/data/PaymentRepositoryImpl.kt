package net.kuama.test.data

import android.content.Context
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import net.kuama.test.data.models.PaymentDetails
import net.kuama.test.data.network.NetworkApi
import net.kuama.test.data.network.RetrofitClient
import net.kuama.test.view.utils.PreferencesKeys
import net.kuama.test.view.utils.getBooleanFromPreferences
import net.kuama.test.view.utils.getStringFromPreferences
import java.io.IOException
import java.lang.Exception

class PaymentRepositoryImpl: PaymentRepository {

   override fun getData(context: Context): Flow<PaymentDetails?> {
      return flow {
         val shouldFetchOnline = context.getBooleanFromPreferences(PreferencesKeys.FETCH_TYPE)
         if (shouldFetchOnline) {
            val url = context.getStringFromPreferences(PreferencesKeys.JSON_URL)
            emit(getDataFromServer(url))
         } else {
            emit(getDataFromCache(context))
         }
      }
   }

   private suspend fun getDataFromServer(url: String?): PaymentDetails? {
      try {
         val service = RetrofitClient.getClient(url).create(NetworkApi::class.java)
         return service.getJson()
      } catch (e: Exception) {
         e.printStackTrace()
         //should show proper error
      }
      return null
   }

   private fun getDataFromCache(context: Context): PaymentDetails? {
      try {
         val jsonFile = context.assets.open("data.json")
         val json = jsonFile.bufferedReader().use {
            it.readText()
         }
         val jsonType = object: TypeToken<PaymentDetails>() {}.type
         return Gson().fromJson(json, jsonType)
      } catch (e: IOException) {
         e.printStackTrace()
         //should show proper error
      }
      return null
   }
}