package net.kuama.test

import android.app.Application
import net.kuama.test.di.koinModule
import org.koin.android.ext.koin.androidContext
import org.koin.android.ext.koin.androidLogger
import org.koin.core.context.startKoin

class TestApplication: Application() {

   override fun onCreate() {
      super.onCreate()
      setupDependencyInjection()
   }

   private fun setupDependencyInjection() {
      startKoin {
         androidContext(this@TestApplication)
         modules(
            koinModule
         )
      }
   }

}