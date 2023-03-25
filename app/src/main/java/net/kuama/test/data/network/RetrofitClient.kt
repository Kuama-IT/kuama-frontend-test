package net.kuama.test.data.network

import com.google.gson.GsonBuilder
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitClient {

   private const val URL = "https://raw.githubusercontent.com/SaeedRe/kuama-frontend-test/master/app/src/main/assets/"

   fun getClient(url: String?): Retrofit {
      return Retrofit.Builder().apply {
         baseUrl(url?: URL)
         addConverterFactory(GsonConverterFactory.create(GsonBuilder().setLenient().create()))
      }.build()
   }
}