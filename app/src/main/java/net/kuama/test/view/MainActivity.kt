package net.kuama.test.view

import android.os.Bundle
import androidx.activity.ComponentActivity
import com.google.android.material.tabs.TabLayout
import net.kuama.test.R
import net.kuama.test.databinding.ActivityMainBinding
import net.kuama.test.presentation.MainViewModel
import net.kuama.test.view.utils.PreferencesKeys
import net.kuama.test.view.utils.getBooleanFromPreferences
import org.koin.android.viewmodel.ext.android.viewModel

class MainActivity : ComponentActivity() {

   private val mainViewModel: MainViewModel by viewModel()
   private lateinit var binding: ActivityMainBinding

   override fun onCreate(savedInstanceState: Bundle?) {
      super.onCreate(savedInstanceState)
      setupBindings()

      mainViewModel.onActivityStart(this)
      setupInitialViewState()
   }

   private fun setupToolbar() {
      binding.toolbar.setTitle(R.string.app_name)
      binding.toolbar.inflateMenu(R.menu.main_menu)
      binding.toolbar.setOnMenuItemClickListener {
         mainViewModel.onToolbarMenuItemClicked(it.itemId)
      }
   }

   /** Most of the data for the activity layout is populate in views by data binding
    * directly from viewModel and they are set in the @BindingAdapters.kt file*/
   private fun setupBindings() {
      binding = ActivityMainBinding.inflate(layoutInflater)
      binding.viewModel = mainViewModel
      setContentView(binding.root)
   }

   private fun setupInitialViewState() {
      setupToolbar()
      setupDropDown()
      setupTabLayout()
      setupOnlineSwitch()
   }

   private fun setupDropDown() {
      binding.paymentTypeEditText.inputType = 0
      binding.paymentTypeEditText.setOnItemClickListener { parent, _, position, _ ->
         val item = parent.getItemAtPosition(position)
         mainViewModel.onDropDownItemSelected(item as String)
      }
   }

   private fun setupTabLayout() {
      binding.paymentTypeTabLayout.getChildAt(0).isSelected = false
      binding.paymentTypeTabLayout.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
         override fun onTabSelected(tab: TabLayout.Tab?) {
            mainViewModel.onTabSelected(tab?.text.toString())
         }

         override fun onTabUnselected(tab: TabLayout.Tab?) {
         }

         override fun onTabReselected(tab: TabLayout.Tab?) {
         }
      })
   }

   private fun setupOnlineSwitch() {
      binding.paymentOnlineSwitch.setOnCheckedChangeListener { _, checked ->
         mainViewModel.onOnlineSwitchCheckedChanged(checked)
      }
      binding.paymentOnlineSwitch.isChecked = getBooleanFromPreferences(PreferencesKeys.FETCH_TYPE)
   }

}