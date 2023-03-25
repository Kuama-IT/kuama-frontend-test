package net.kuama.test.view.ui

import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import android.widget.LinearLayout
import androidx.core.widget.doAfterTextChanged
import androidx.databinding.BindingAdapter
import com.google.android.material.tabs.TabLayout
import com.google.android.material.textfield.TextInputLayout
import net.kuama.test.R
import net.kuama.test.view.utils.runAfterFadeOutAnimation
import java.util.regex.Pattern

@BindingAdapter("fieldsList")
fun setFieldsList(layout: LinearLayout, fieldsList: Map<String, String>?) {
   /*The layout is hidden to be shown later with animation*/
   layout.visibility = View.GONE
   layout.removeAllViews()

   val inflater =
      layout.context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater

   fieldsList?.forEach { entry ->
      val inputLayout = createFieldTextInput(inflater, layout, entry)
      layout.addView(inputLayout)
   }

   layout.runAfterFadeOutAnimation(true) {
      layout.visibility = View.VISIBLE
   }
}

private fun createFieldTextInput(inflater: LayoutInflater, parent: LinearLayout,
                                 fieldData: Map.Entry<String, String>): View {
   val inputLayout =
      inflater.inflate(R.layout.form_input_field, parent, false) as TextInputLayout
   val editText = inputLayout.editText
   val key = fieldData.key
   val prettyHint = key.replace("_", " ", true)
   inputLayout.hint = prettyHint
   val regexPattern = fieldData.value
   editText?.doAfterTextChanged {
      val pattern = Pattern.compile(regexPattern)
      if (!pattern.matcher(it.toString()).matches()) {
         editText.error = editText.context.getText(R.string.invalid_input)
      } else {
         editText.error = null
      }
   }
   return inputLayout
}

@BindingAdapter("dropDownItems")
fun setDropDownData(textView: AutoCompleteTextView, items: List<String>?) {
   items?.let {
      val mutableList = items.toMutableList()
      mutableList.add(0, "None")
      val adapter =
         ArrayAdapter(textView.context, R.layout.list_dropdown_item, mutableList)
      textView.setAdapter(adapter)
      textView.setText(mutableList.first(), false)
   }
}

@BindingAdapter("tabs")
fun setTabLayoutTabs(tabLayout: TabLayout, tabs: List<String>?) {
   tabLayout.removeAllTabs()
   tabs?.forEach {
      tabLayout.newTab().apply { text = it }.also { tabLayout.addTab(it) }
   }
}