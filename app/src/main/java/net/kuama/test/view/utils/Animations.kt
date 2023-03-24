package net.kuama.test.view.utils

import android.content.Context
import android.view.View
import android.view.animation.Animation
import android.view.animation.AnimationUtils
import androidx.annotation.AnimRes
import net.kuama.test.R
import java.lang.Exception

fun View.runAfterFadeOutAnimation(showAnimation: Boolean = true,
                                  block: () -> Unit) {
   if (showAnimation) {
      runAfterFadeOutAnimation(200) {
         block()
      }
   } else block()
}

fun View.runAfterFadeOutAnimation(duration: Long = 200, block: View.() -> Unit) {
   runAnimation(R.anim.fade_out, duration, block)
}

fun View.runAnimation(@AnimRes anim: Int, duration: Long, block: View.() -> Unit) {
   context.loadAnimation(anim, duration)?.apply {
      runOnAnimationEnd(this, block)
   }?.also {
      startAnimation(it)
   }
}

fun Context.loadAnimation(@AnimRes resId: Int, duration: Long): Animation? {
   return try {
      AnimationUtils.loadAnimation(this, resId).apply {
         this.duration = duration
      }
   } catch (e: Exception) {
      e.printStackTrace()
      null
   }
}

fun View.runOnAnimationEnd(animation: Animation, doAfter: View.() -> Unit) {
   animation.setAnimationListener(object :
      Animation.AnimationListener {
      override fun onAnimationEnd(animation: Animation?) {
         doAfter()
      }

      override fun onAnimationStart(p0: Animation?) {

      }

      override fun onAnimationRepeat(p0: Animation?) {
      }
   })
}