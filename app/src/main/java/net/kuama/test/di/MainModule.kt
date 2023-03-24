package net.kuama.test.di

import net.kuama.test.data.PaymentRepositoryImpl
import net.kuama.test.data.PaymentRepository
import net.kuama.test.presentation.MainViewModel
import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module

val koinModule = module {

   viewModel { MainViewModel(get()) }
   factory<PaymentRepository> { PaymentRepositoryImpl() }
}