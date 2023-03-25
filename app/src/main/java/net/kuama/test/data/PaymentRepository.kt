package net.kuama.test.data

import android.content.Context
import kotlinx.coroutines.flow.Flow
import net.kuama.test.data.models.PaymentDetails
import net.kuama.test.data.models.PaymentModel

interface PaymentRepository {
   fun getData(context: Context) : Flow<PaymentDetails?>
}