import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { submitBookingRequest } from '@/features/booking/api/booking.api'
import type { AdditionalInfo, TripDetails, YourDetails } from '@/features/booking/types/booking.types'

export const TOTAL_STEPS = 4

export const useBookingStore = defineStore('booking', () => {
  const currentStep = ref(1)
  const furthestStepReached = ref(1)

  const tripDetails = reactive<TripDetails>({
    service: '',
    travelType: '',
    destination: '',
    travelDate: '',
    adults: 1,
    children: 0,
    lengthOfStay: '',
    specialRequests: '',
  })

  const yourDetails = reactive<YourDetails>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
  })

  const additionalInfo = reactive<AdditionalInfo>({
    preferredAccommodation: '',
    dietaryRequirements: '',
    airportPickupRequired: false,
    celebratingOccasion: '',
    accessibilityRequirements: '',
  })

  const stepErrors = reactive<Record<string, string>>({})
  const isSubmitting = ref(false)
  const isSubmitted = ref(false)
  const agreedToTerms = ref(false)

  function clearErrors() {
    Object.keys(stepErrors).forEach((key) => delete stepErrors[key])
  }

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function isValidPhone(phone: string) {
    return /^[+\d][\d\s-]{6,}$/.test(phone.trim())
  }

  function validateStep1() {
    clearErrors()
    if (!tripDetails.service) stepErrors.service = 'Please select what you would like to book.'
    if (!tripDetails.travelType) stepErrors.travelType = 'Please select a travel type.'
    if (!tripDetails.destination) stepErrors.destination = 'Please select a destination.'
    if (!tripDetails.travelDate) {
      stepErrors.travelDate = 'Please select your preferred travel date.'
    } else if (new Date(tripDetails.travelDate).getTime() < Date.now() - 86400000) {
      stepErrors.travelDate = 'Travel date must be today or in the future.'
    }
    if (!tripDetails.adults || tripDetails.adults < 1) stepErrors.adults = 'Please select at least 1 adult.'
    if (!tripDetails.lengthOfStay) stepErrors.lengthOfStay = 'Please select the length of stay.'
    return Object.keys(stepErrors).length === 0
  }

  function validateStep2() {
    clearErrors()
    if (!yourDetails.fullName.trim()) stepErrors.fullName = 'Please enter your full name.'
    if (!yourDetails.email.trim()) {
      stepErrors.email = 'Please enter your email address.'
    } else if (!isValidEmail(yourDetails.email)) {
      stepErrors.email = 'Please enter a valid email address.'
    }
    if (!yourDetails.phone.trim()) {
      stepErrors.phone = 'Please enter your phone number.'
    } else if (!isValidPhone(yourDetails.phone)) {
      stepErrors.phone = 'Please enter a valid phone number.'
    }
    return Object.keys(stepErrors).length === 0
  }

  function validateStep4() {
    clearErrors()
    if (!agreedToTerms.value) stepErrors.agreedToTerms = 'Please confirm you agree before submitting.'
    return Object.keys(stepErrors).length === 0
  }

  function validateCurrentStep() {
    if (currentStep.value === 1) return validateStep1()
    if (currentStep.value === 2) return validateStep2()
    // Step 3 (Additional Information) is entirely optional per the brief.
    return true
  }

  function goToNextStep() {
    if (!validateCurrentStep()) return false
    if (currentStep.value < TOTAL_STEPS) {
      currentStep.value += 1
      if (currentStep.value > furthestStepReached.value) furthestStepReached.value = currentStep.value
    }
    return true
  }

  function goToPreviousStep() {
    clearErrors()
    if (currentStep.value > 1) currentStep.value -= 1
  }

  function goToStep(step: number) {
    // Only completed steps are jumpable to, per the brief.
    if (step <= furthestStepReached.value) {
      clearErrors()
      currentStep.value = step
    }
  }

  const isLastStep = computed(function checkIsLastStep() {
    return currentStep.value === TOTAL_STEPS
  })

  async function submitBooking() {
    if (!validateStep4()) return
    isSubmitting.value = true
    await submitBookingRequest({ tripDetails, yourDetails, additionalInfo })
    isSubmitting.value = false
    isSubmitted.value = true
  }

  function resetBooking() {
    currentStep.value = 1
    furthestStepReached.value = 1
    isSubmitted.value = false
    agreedToTerms.value = false
    clearErrors()
    Object.assign(tripDetails, {
      service: '',
      travelType: '',
      destination: '',
      travelDate: '',
      adults: 1,
      children: 0,
      lengthOfStay: '',
      specialRequests: '',
    })
    Object.assign(yourDetails, { fullName: '', email: '', phone: '', country: '' })
    Object.assign(additionalInfo, {
      preferredAccommodation: '',
      dietaryRequirements: '',
      airportPickupRequired: false,
      celebratingOccasion: '',
      accessibilityRequirements: '',
    })
  }

  return {
    currentStep,
    furthestStepReached,
    tripDetails,
    yourDetails,
    additionalInfo,
    stepErrors,
    isSubmitting,
    isSubmitted,
    agreedToTerms,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    submitBooking,
    resetBooking,
  }
})