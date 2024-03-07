import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, UrlSegment  } from '@angular/router'; 

import { DansorgLayoutComponent } from './layouts/dansorg-layout/dansorg-layout.component';
import { DansorgInnerLayoutComponent } from './layouts/dansorg-inner-layout/dansorg-inner-layout.component';
import { DanshopLayoutComponent } from './layouts/danshop-layout/danshop-layout.component';
import { DanshopInnerLayoutComponent } from './layouts/danshop-inner-layout/danshop-inner-layout.component';

import { HomepageComponent } from './homepage/homepage.component';
import { CovidNineteenComponent } from './covid-nineteen/covid-nineteen.component';
import { ReturnComponent } from './return/return.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { InternationalDanComponent } from './international-dan/international-dan.component';
import { AlertDriverComponent } from './alert-driver/alert-driver.component';
import { ServicesComponent } from './services/services.component';
import { AnnualDivingReportComponent } from './annual-diving-report/annual-diving-report.component';
import { ChamberSafetyComponent } from './chamber-safety/chamber-safety.component';
import { DiveMedicalFormsComponent } from './dive-medical-forms/dive-medical-forms.component';
import { DanResourcesComponent } from './dan-resources/dan-resources.component';
import { EducationComponent } from './education/education.component';
import { LegalNetworkComponent } from './legal-network/legal-network.component';
import { AnnualFreediverComponent } from './annual-freediver/annual-freediver.component';
import { AnnualComponent } from './annual/annual.component';
import { DiveCoverComponent } from './dive-cover/dive-cover.component';
import { TemporaryComponent } from './temporary/temporary.component';

import { AboutComponent } from './about/about.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { CartComponent } from './cart/cart.component';
import { DanshopMemberInformationComponent } from './danshop-member-information/danshop-member-information.component';
import { DanshopAboutComponent } from './danshop-about/danshop-about.component';
import { DanshopTermsConditionsComponent } from './danshop-terms-conditions/danshop-terms-conditions.component';

import { DanshopPrivacyPolicyComponent } from './danshop-privacy-policy/danshop-privacy-policy.component';
import { DanshopDeliveryShippingComponent } from './danshop-delivery-shipping/danshop-delivery-shipping.component';
import { DanshopReturnInformationComponent } from './danshop-return-information/danshop-return-information.component';
import { DanshopContactUsComponent } from './danshop-contact-us/danshop-contact-us.component';
import { AuthGuard } from './auth.guard';   
 
// function typeApplicationMatcher(url: UrlSegment[]) {
// 	// Check if the URL has the correct format
// 	const regex = /^(\w+)-application$/;
// 	const match = url[0]?.path.match(regex);
  
// 	// If the URL matches the expected format, consume it
// 	return match ? ({ consumed: url }) : null;
// }
  
const routes: Routes = [
  //danorg
  {
	path: '',
	component: DansorgLayoutComponent,
	loadChildren: () => import('./homepage/homepage.module').then(module => module.HomepageModule)
  },
  {
	path: 'covid-19',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./covid-nineteen/covid-nineteen.module').then(module => module.CovidNineteenModule)
  },
  {
	path: 'our-team',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./our-team/our-team.module').then(module => module.OurTeamModule)
  },
  {
	path: 'international-dan',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./international-dan/international-dan.module').then(module => module.InternationalDanModule)
  },
  {
	path: 'services',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./services/services.module').then(module => module.ServicesModule)
  },
  {
	path: 'return',
	component: DansorgLayoutComponent,
	loadChildren: () => import('./return/return.module').then(module => module.ReturnModule)
  },
  {
	path: 'alert-driver',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./alert-driver/alert-driver.module').then(module => module.AlertDriverModule)
  },
  {
	path: 'about',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./about/about.module').then(module => module.AboutModule)
  },
  {
	path: 'annual-diving-report',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./annual-diving-report/annual-diving-report.module').then(module => module.AnnualDivingReportModule)
  },
  {
	path: 'chamber-safety',
	component: DansorgLayoutComponent,
	loadChildren: () => import('./chamber-safety/chamber-safety.module').then(module => module.ChamberSafetyModule)
  },
  {
	path: 'dive-medical-forms',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./dive-medical-forms/dive-medical-forms.module').then(module => module.DiveMedicalFormsModule)
  },
  {
	path: 'dan-resources',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./dan-resources/dan-resources.module').then(module => module.DanResourcesModule)
  },
  {
	path: 'education',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./education/education.module').then(module => module.EducationModule)
  },
  {
	path: 'legal-network',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./legal-network/legal-network.module').then(module => module.LegalNetworkModule)
  },
  {
	path: 'request-legal-advice',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./request-legal-advice/request-legal-advice.module').then(module => module.RequestLegalAdviceModule)
  },
  {
	path: 'dive-cover',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./dive-cover/dive-cover.module').then(module => module.DiveCoverModule)
  },  
  {
	path: 'annual',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./annual/annual.module').then(module => module.AnnualModule)
  },
  {
	path: 'annual-freediver',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./annual-freediver/annual-freediver.module').then(module => module.AnnualFreediverModule)
  },
  {
	path: 'temporary',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./temporary/temporary.module').then(module => module.TemporaryModule)
  },
  {
	path: 'research',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./research/research.module').then(module => module.ResearchModule)
  },
  {
	path: 'report-an-incident',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./report-an-incident/report-an-incident.module').then(module => module.ReportIncidentModule)
  },
  {
	path: 'medicine',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./medicine/medicine.module').then(module => module.MedicineModule)
  },
  {
	path: 'partner-programs',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./partner-programs/partner-programs.module').then(module => module.PartnerProgramsModule)
  },
  {
	path: 'travel-statement',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./travel-statement/travel-statement.module').then(module => module.TravelStatementModule)
  },
  {
	path: 'test-station-resources',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./test-station-resources/test-station-resources.module').then(module => module.TestStationResourcesModule)
  },
  {
	path: 'commercial',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./commercial/commercial.module').then(module => module.CommercialModule)
  },
  {
	path: 'student',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./student/student.module').then(module => module.StudentModule)
  },
  {
	path: 'login',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
  },
  {
	path: 'dashboard',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/dashboard/dashboard.module').then(module => module.LoginDashboardModule),
	canActivate: [AuthGuard],		  	  
  },
  {
	path: 'personal-info',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/personal_info/personal.module').then(module => module.PersonalInfoModule),
	canActivate: [AuthGuard],              
  },
  {
	path: 'membership-info',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/membership_info/membership.module').then(module => module.MembershipInfoModule),
	canActivate: [AuthGuard],
  },
  {
	path: 'address-info',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/address_info/address.module').then(module => module.AddressInfoModule),
	canActivate: [AuthGuard],
  },
  {
	path: 'student-membership',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/student_member_annual/student_member_annual.module').then(module => module.StudentMemberAnnualModule),
	canActivate: [AuthGuard],
  },
  {
	path: 'upgrade-membership',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/upgrade_member_annual/upgrade_member_annual.module').then(module => module.UpgradeMemberAnnualModule),
	canActivate: [AuthGuard],
  },
  {
	path: 'kin-info',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/kin_info/kin.module').then(module => module.KinInfoModule),
	canActivate: [AuthGuard],
  },
  {
	path: 'diving-family',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/diving_family/diving_family.module').then(module => module.DivingFamilyModule),
	canActivate: [AuthGuard],
  },
  {
	path: 'non-diving-family',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/non_diving_family/non_diving_family.module').then(module => module.NonDivingFamilyModule),
	canActivate: [AuthGuard],
  },
  {
	path: 'bank-details',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/bank_details/bank_details.module').then(module => module.BankDetailsMemberModule),
	canActivate: [AuthGuard],
  },
  {
	path: 'instructor',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/instructor/instructor.module').then(module => module.InstructorMemberModule),
	canActivate: [AuthGuard],
  },{
	path: 'qualifications',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/qualifications/qualifications.module').then(module => module.QualificationsMemberModule),
	canActivate: [AuthGuard],
  },{
	path: 'provider',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/provider/provider.module').then(module => module.ProviderMemberModule),
	canActivate: [AuthGuard],
  },{
	path: 'instructor-students',		
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/instructor_students/inst_student.module').then(module => module.InstructorStudentModule),
	canActivate: [AuthGuard],
  },{
	path: 'industry-partner',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/industry_partner/industry_partner.module').then(module => module.IndustryPartnerModule),
	canActivate: [AuthGuard],
  },		
  {
	path: 'dive-centre-partner',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/dive_centre_partner/dive-centre-partner.module').then(module => module.DiveCentrePartnerModule),
	canActivate: [AuthGuard],
  },
  {
	path: 'profile',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/profile/profile.module').then(module => module.ProfileMemberModule),
	canActivate: [AuthGuard],			
  },   
  {
	path: 'payment',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/payment/payment.module').then(module => module.PaymentComponentModule),
	canActivate: [AuthGuard],    		
  },   
  {
	path: 'pay-renewal',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/pay_renewal/pay_renewal.module').then(module => module.PayRenewalComponentModule),
	canActivate: [AuthGuard],    		
  },       
  {
	path: 'paynow',   
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./member_dashboard/paynow/paynow.module').then(module => module.PaynowComponentModule),
	canActivate: [AuthGuard],   						 				
  },  
  {
	path: 'webinars',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./webinars/webinars.module').then(module => module.WebinarsModule)
  },
  {
	path: 'cancellation-request',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./cancellation-request/cancellation-request.module').then(module => module.CancellationRequestModule)
  },
  {
	path: 'infographics',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographics/infographics.module').then(module => module.InfographicsModule)
  },
  {
	path: 'infographic-13-ways-to-run-out-of-air',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographic-thirteen-ways-to-run-out-of-air/infographic-thirteen-ways-to-run-out-of-air.module').then(module => module.InfographicThirteenWaysToRunOutOfAirModule)
  },
  {
	path: 'infographic-more-water-less-bubbles',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographic-more-water-less-bubbles/infographic-more-water-less-bubbles.module').then(module => module.InfographicMoreWaterLessBubblesModule)
  },
  {
	path: 'infographic-propellers-can-kill',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographic-propellers-can-kill/infographic-propellers-can-kill.module').then(module => module.InfographicPropellersCanKillModule)
  },
  {
	path: 'infographic-7-mistakes',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographic-seven-mistakes/infographic-seven-mistakes.module').then(module => module.InfographicSevenMistakesModule)
  },
  {
	path: 'infographic-release-the-pressure',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographic-release-the-pressure/infographic-release-the-pressure.module').then(module => module.InfographicReleaseThePressureModule)
  },
  {
	path: 'infographic-safety-in-the-air',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographic-safety-in-the-air/infographic-safety-in-the-air.module').then(module => module.InfographicSafetyInTheAirModule)
  },
  {
	path: 'infographic-lost-at-sea',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographic-lost-at-sea/infographic-lost-at-sea.module').then(module => module.InfographicLostAtSeaModule)
  },
  {
	path: 'infographic-aging-diver',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographic-aging-diver/infographic-aging-diver.module').then(module => module.InfographicAgingDiverModule)
  },
  {
	path: 'infographic-diabetes',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographic-diabetes/infographic-diabetes.module').then(module => module.InfographicDiabetesModule)
  },
  {
	path: 'infographic-fatalities',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographic-fatalities/infographic-fatalities.module').then(module => module.InfographicFatalitiesModule)
  },
  {
	path: 'infographic-flying',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographic-flying/infographic-flying.module').then(module => module.InfographicFlyingModule)
  },
  {
	path: 'infographic-pfo',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographic-pfo/infographic-pfo.module').then(module => module.InfographicPfoModule)
  },
  {
	path: 'infographic-oxygen-course',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographic-oxygen-course/infographic-oxygen-course.module').then(module => module.InfographicOxygenCourseModule)
  },
  {
	path: 'infographic-basic-life-support',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographic-basic-life-support/infographic-basic-life-support.module').then(module => module.InfographicBasicLifeSupportModule)
  },
  {
	path: 'infographic-temp-membership',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographic-temp-membership/infographic-temp-membership.module').then(module => module.InfographicTempMembershipModule)
  },
  {
	path: 'infographic-annual-membership',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographic-annual-membership/infographic-annual-membership.module').then(module => module.InfographicAnnualMembershipModule)
  }, 
  {
	path: 'infographic-student',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./infographic-student/infographic-student.module').then(module => module.InfographicStudentModule)
  },
  {
	path: 'technical-diving',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./technical-diving/technical-diving.module').then(module => module.TechnicalDivingModule)
  },
  {
	path: 'travel-notification',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./travel-notification/travel-notification.module').then(module => module.TravelNotificationModule)
  },
  {
	path: 'travel-notification-thank-you',
	component: DansorgLayoutComponent,
	loadChildren: () => import('./travel-notification-thank-you/travel-notification-thank-you.module').then(module => module.TravelNotificationThankYouModule)
  },
  {
	path: 'equipment',
	component: DansorgLayoutComponent,
	loadChildren: () => import('./equipment/equipment.module').then(module => module.EquipmentModule)
  },
  {
	path: 'fitness',
	component: DansorgLayoutComponent,
	loadChildren: () => import('./fitness/fitness.module').then(module => module.FitnessModule)
  },
  {
	path: 'health-status',
	component: DansorgLayoutComponent,
	loadChildren: () => import('./health-status/health-status.module').then(module => module.HealthStatusModule)
  },
  {
	path: 'period-of-inactivity',
	component: DansorgLayoutComponent,
	loadChildren: () => import('./period-of-inactivity/period-of-inactivity.module').then(module => module.PeriodOfInactivityModule)
  },
  {
	path: 'refresh-you-skills',
	component: DansorgLayoutComponent,
	loadChildren: () => import('./refresh-you-skills/refresh-you-skills.module').then(module => module.RefreshYouSkillsModule)
  },
  {
	path: 'refresh-you-skills',
	component: DansorgLayoutComponent,
	loadChildren: () => import('./refresh-you-skills/refresh-you-skills.module').then(module => module.RefreshYouSkillsModule)
  },
  {
	path: 'travel-safely',
	component: DansorgLayoutComponent,
	loadChildren: () => import('./travel-safely/travel-safely.module').then(module => module.TravelSafelyModule)
  },
  {
	path: 'safety-assessment-chamber-operations',
	component: DansorgLayoutComponent,
	loadChildren: () => import('./safety-assessment-chamber-operations/safety-assessment-chamber-operations.module').then(module => module.SafetyAssessmentChamberOperationsModule)
  },
  {
	path: 'safety-training-chamber-operations',
	component: DansorgLayoutComponent,
	loadChildren: () => import('./safety-training-chamber-operations/safety-training-chamber-operations.module').then(module => module.SafetyTrainingChamberOperationsModule)
  },
  {
	path: 'provider-courses',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./provider-courses/provider-courses.module').then(module => module.ProviderCoursesModule)
  },
  {
	path: 'provider-course-files',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./provider-course-files/provider-course-files.module').then(module => module.ProviderCourseFilesModule)
  },
  {
	path: 'gear-rental',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./gear-rental/gear-rental.module').then(module => module.GearRentalModule)
  },
  {
	path: 'instructor-courses',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./instructor-courses/instructor-courses.module').then(module => module.InstructorCoursesModule)
  },
  {
	path: 'instructor-course-files',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./instructor-course-files/instructor-course-files.module').then(module => module.InstructorCourseFilesModule)
  },
  {
	path: 'safety-resources-chamber-operators',
	component: DansorgLayoutComponent,
	loadChildren: () => import('./safety-resources-chamber-operators/safety-resources-chamber-operators.module').then(module => module.SafetyResourcesChamberOperatorsModule)
  },
  {
	path: 'application-submit-success',
	component: DansorgLayoutComponent,
	loadChildren: () => import('./application-submit-success/application-submit-success.module').then(module => module.ApplicationSubmitSuccessModule)
  },
  {
	path: 'cancellation-survey',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./cancellation-survey/cancellation-survey.module').then(module => module.CancellationSurveyModule)
  },
  {
	path: 'it-course-files',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./it-course-files/it-course-files.module').then(module => module.ItCourseFilesModule)
  },
  {
	path: 'annual-application',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./annual-application/annual-application.module').then(module => module.AnnualApplicationModule)
  },
   {
 	path: 'student-application',
 	component: DansorgInnerLayoutComponent,
 	loadChildren: () => import('./student-application/student-application.module').then(module => module.StudentApplicationModule)
   }, 
   {
	path: 'dive-centre-partner',
	component: DansorgLayoutComponent,
	loadChildren: () => import('./dive-centre-partner/dive-centre-partner.module').then(module => module.DiveCentrePartnerModule)
   },
   {
	path: 'dive-centre-partner-application',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./dive-centre-partner-application/dive-centre-partner-application.module').then(module => module.DiveCentrePartnerApplicationModule)
   }, 
   {
	 path: 'dive-centre-partner-client-registration-form',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./dive-centre-partner-client-registration-form/dive-centre-partner-client-registration-form.module').then(module => module.DiveCentrePartnerClientRegistrationFormModule)
   },
   {
	path: 'operational-safety-resources',
	component: DansorgLayoutComponent,
	loadChildren: () => import('./operational-safety-resources/operational-safety-resources.module').then(module => module.OperationalSafetyResourcesModule)
   },
   {
	path: 'contact',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./contact/contact.module').then(module => module.ContactModule)
   },
   {
	path: 'logo-policy',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./logo-policy/logo-policy.module').then(module => module.LogoPolicyModule)
   },
   {
	path: 'copyright',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./copyright/copyright.module').then(module => module.CopyrightModule)
   },
   {
	path: 'privacy-policy',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./privacy-policy/privacy-policy.module').then(module => module.PrivacyPolicyModule)
   },
   {
	path: 'intern-packages',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./intern-packages/intern-packages.module').then(module => module.InternPackagesModule)
   },
   {
	path: 'dansadansaorg',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./dansadansaorg/dansadansaorg.module').then(module => module.DansadansaorgModule)
   },
   {
	path: 'find-a-dive-doctor',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./find-a-dive-doctor/find-a-dive-doctor.module').then(module => module.FindADiveDoctorModule)
   },
   {
	path: 'find-a-dan-instructor',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./find-a-dan-instructor/find-a-dan-instructor.module').then(module => module.FindADanInstructorModule)
   },
   {
	path: 'hira-program',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./hira-program/hira-program.module').then(module => module.HiraProgramModule)
   },
   {
	path: 'industry-partners',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./industry-partners/industry-partners.module').then(module => module.IndustryPartnersModule)
   },
   {
	path: 'industry-partner-application',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./industry-partner-application/industry-partner-application.module').then(module => module.IndustryPartnerApplicationModule)
   },
   {
	path: 'malaria',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./malaria/malaria.module').then(module => module.MalariaModule)
   },
   {
	path: 'physician-network',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./physician-network/physician-network.module').then(module => module.PhysicianNetworkModule)
   },
   {
	path: 'medical-resources',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./medical-resources/medical-resources.module').then(module => module.MedicalResourcesModule)
   },
   {
	path: 'chamber-network',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./chamber-network/chamber-network.module').then(module => module.ChamberNetworkModule)
   },
   {
	path: 'current-projects',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./current-projects/current-projects.module').then(module => module.CurrentProjectsModule)
   },
   {
	path: 'online-seminars',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./online-seminars/online-seminars.module').then(module => module.OnlineSeminarsModule)
   },
   {
	path: 'completed-projects',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./completed-projects/completed-projects.module').then(module => module.CompletedProjectsModule)
   },
   {
	path: 'blog',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./blog/blog.module').then(module => module.BlogModule)
   },
  /* danshop routes */
  {
	path: 'danshop',
	component: DanshopLayoutComponent,
	loadChildren: () => import('./danshop-home/danshop-home.module').then(module => module.DanshopHomeModule)
  },
  {
	path: 'danshop/product-details/:id',
	component: DanshopInnerLayoutComponent,
	loadChildren: () => import('./product-details/product-details.module').then(module => module.ProductDetailsModule)
  },
  {
	path: 'danshop/allproducts',
	component: DanshopInnerLayoutComponent,
	loadChildren: () => import('./allproducts/allproducts.module').then(module => module.AllproductsModule)
  },
  {
	path: 'danshop/category/:slug',
	component: DanshopLayoutComponent,
	loadChildren: () => import('./category/category.module').then(module => module.CategoryModule)
  },
  {
	path: 'danshop/search',
	component: DanshopInnerLayoutComponent,
	loadChildren: () => import('./danshop-search/danshop-search.module').then(module => module.DanshopSearchModule)
  },
  {
	path: 'danshop/cart',
	component: DanshopInnerLayoutComponent,
	loadChildren: () => import('./cart/cart.module').then(module => module.CartModule)
  },
  {
	path: 'danshop/checkout',
	component: DanshopInnerLayoutComponent,
	loadChildren: () => import('./checkout/checkout.module').then(module => module.CheckoutModule)
  },
  {
	path: 'danshop/member-information',
	component: DanshopInnerLayoutComponent,
	loadChildren: () => import('./danshop-member-information/danshop-member-information.module').then(module => module.DanshopMemberInformationModule)
  },
  {
	path: 'danshop/about-us',
	component: DanshopInnerLayoutComponent,
	loadChildren: () => import('./danshop-about/danshop-about.module').then(module => module.DanshopAboutModule)
  },
  {
	path: 'danshop/terms-conditions',
	component: DanshopInnerLayoutComponent,
	loadChildren: () => import('./danshop-terms-conditions/danshop-terms-conditions.module').then(module => module.DanshopTermsConditionsModule)
  },
  {
	path: 'danshop/privacy-policy',
	component: DanshopInnerLayoutComponent,
	loadChildren: () => import('./danshop-privacy-policy/danshop-privacy-policy.module').then(module => module.DanshopPrivacyPolicyModule)
  },
  {
	path: 'danshop/returns',
	component: DanshopInnerLayoutComponent,
	loadChildren: () => import('./danshop-returns/danshop-returns.module').then(module => module.DanshopReturnsModule)
  },
  {
	path: 'danshop/delivery-shipping',
	component: DanshopInnerLayoutComponent,
	loadChildren: () => import('./danshop-delivery-shipping/danshop-delivery-shipping.module').then(module => module.DanshopDeliveryShippingModule)
  },
  {
	path: 'danshop/return-information',
	component: DanshopInnerLayoutComponent,
	loadChildren: () => import('./danshop-return-information/danshop-return-information.module').then(module => module.DanshopReturnInformationModule)
  },
  {
	path: 'danshop/contact-us',
	component: DanshopLayoutComponent,
	loadChildren: () => import('./danshop-contact-us/danshop-contact-us.module').then(module => module.DanshopContactUsModule)
  },
  {
	path: 'danshop/account',
	component: DanshopInnerLayoutComponent,
	loadChildren: () => import('./account/account.module').then(module => module.AccountModule)
  }, 
  {
	path: 'danshop/wishlist',
	component: DanshopInnerLayoutComponent,
	loadChildren: () => import('./danshop-wishlist/danshop-wishlist.module').then(module => module.DanshopWishlistModule)
  },
  {
	path: 'danshop/affiliate',
	component: DanshopInnerLayoutComponent,
	loadChildren: () => import('./affilate/affilate.module').then(module => module.AffilateModule)
  },
  {
	path: 'danshop/gift-certificates',
	component: DanshopInnerLayoutComponent,
	loadChildren: () => import('./danshop-gift-certificates/danshop-gift-certificates.module').then(module => module.DanshopGiftCertificatesModule)
  },
  {
	path: 'danshop/sitemap',
	component: DanshopInnerLayoutComponent,
	loadChildren: () => import('./danshop-sitemap/danshop-sitemap.module').then(module => module.DanshopSitemapModule)
  },
//   {
// 	matcher: typeApplicationMatcher,
// 	component: DansorgInnerLayoutComponent,
// 	loadChildren: () => import('./common-application/common-application.module').then(module => module.CommonApplicationModule)
//   },
  {
	path:'verify/:email_address',
	component: DansorgInnerLayoutComponent,
	loadChildren: () => import('./verify-application/verify-application.module').then(module => module.VerifyApplicationModule)
  },
  {
	 path: '**',
	 component: DansorgInnerLayoutComponent,
	 loadChildren: () => import('./page-not-found/page-not-found.module').then(module => module.PageNotFoundModule)
  },  
]; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
