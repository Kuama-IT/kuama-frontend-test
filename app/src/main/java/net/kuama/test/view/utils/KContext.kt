package net.kuama.test.view.utils

import android.content.Context
import android.content.SharedPreferences
import android.text.InputType
import android.widget.EditText
import androidx.appcompat.app.AlertDialog
import net.kuama.test.R

fun Context.showInputDialog(title: Int, msgId: Int,
                            defaultInput: String?, onPositiveCallback: (String) -> Unit) {
   AlertDialog.Builder(this).apply {
      setTitle(title)
      setMessage(msgId)
      val input = EditText(this@showInputDialog).apply {
         inputType = InputType.TYPE_TEXT_VARIATION_URI
      }
      defaultInput?.let {
         input.setText(it)
      }
      setView(input)

      setPositiveButton(R.string.action_set) { _, _ ->
         onPositiveCallback(input.text.toString())
      }
      setNegativeButton(R.string.action_cancel) { dialog, _ ->
         dialog.cancel()
      }
   }.also {
      it.show()
   }
}

fun Context.getPreferences(): SharedPreferences {
   return getSharedPreferences("Preferences", Context.MODE_PRIVATE)
}

fun Context.storeValueInSharedPreferences(key: String, value: String) {
   getPreferences().edit().apply {
      putString(key, value)
      apply()
   }
}

fun Context.storeValueInSharedPreferences(key: String, value: Boolean) {
   getPreferences().edit().apply {
      putBoolean(key, value)
      apply()
   }
}

fun Context.getStringFromPreferences(key: String): String? {
   return getPreferences().getString(key, null)
}

fun Context.getBooleanFromPreferences(key: String): Boolean {
   return getPreferences().getBoolean(key, false)
}