package net.kuama.test.data

import android.content.Context
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import net.kuama.test.data.models.PaymentDetails
import net.kuama.test.data.models.PaymentModel
import java.io.IOException

class PaymentRepositoryImpl: PaymentRepository {

   override fun getData(context: Context): PaymentDetails? {
      try {
         val jsonFile = context.assets.open("data.json")
         val json = jsonFile.bufferedReader().use {
            it.readText()
         }
         val jsonType = object: TypeToken<PaymentDetails>() {}.type
         return Gson().fromJson(json, jsonType)
      } catch (e: IOException) {
         e.printStackTrace()
      }
      return null
   }
}