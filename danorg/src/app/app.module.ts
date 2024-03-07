import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from "./CartService";
import { ActiveCustomerService } from "./active-customer.service";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { InnerHeaderComponent } from './inner-header/inner-header.component';
import { CovidNineteenComponent } from './covid-nineteen/covid-nineteen.component';
import { SubFooterComponent } from './sub-footer/sub-footer.component';
import { ReturnComponent } from './return/return.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { InternationalDanComponent } from './international-dan/international-dan.component';
import { AlertDriverComponent } from './alert-driver/alert-driver.component';
import { ServicesComponent } from './services/services.component';
import { DansorgLayoutComponent } from './layouts/dansorg-layout/dansorg-layout.component';
import { DansorgInnerLayoutComponent } from './layouts/dansorg-inner-layout/dansorg-inner-layout.component';
import { DanshopLayoutComponent } from './layouts/danshop-layout/danshop-layout.component';
import { DanshopHomeComponent } from './danshop-home/danshop-home.component';
import { DanshopHeaderComponent } from './danshop-header/danshop-header.component';
import { DanshopFooterComponent } from './danshop-footer/danshop-footer.component';
import { AboutComponent } from './about/about.component';
import { DanshopMenuComponent } from './danshop-menu/danshop-menu.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DanshopInnerLayoutComponent } from './layouts/danshop-inner-layout/danshop-inner-layout.component';
import { DanshopInnerHeaderComponent } from './danshop-inner-header/danshop-inner-header.component';
import { CartComponent } from './cart/cart.component';
import { DanshopMemberInformationComponent } from './danshop-member-information/danshop-member-information.component';
import { DanshopAboutComponent } from './danshop-about/danshop-about.component';
import { DanshopTermsConditionsComponent } from './danshop-terms-conditions/danshop-terms-conditions.component';
import { DanshopPrivacyPolicyComponent } from './danshop-privacy-policy/danshop-privacy-policy.component';
import { DanshopDeliveryShippingComponent } from './danshop-delivery-shipping/danshop-delivery-shipping.component';
import { DanshopReturnInformationComponent } from './danshop-return-information/danshop-return-information.component';
import { ChamberSafetyComponent } from './chamber-safety/chamber-safety.component';
import { DiveMedicalFormsComponent } from './dive-medical-forms/dive-medical-forms.component';
import { AnnualDivingReportComponent } from './annual-diving-report/annual-diving-report.component';
import { LegalNetworkComponent } from './legal-network/legal-network.component';
import { RequestLegalAdviceComponent } from './request-legal-advice/request-legal-advice.component';
import { EducationComponent } from './education/education.component';
import { DanResourcesComponent } from './dan-resources/dan-resources.component';
import { CategoryComponent } from './category/category.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { DanshopContactUsComponent } from './danshop-contact-us/danshop-contact-us.component';
import { DiveCoverComponent } from './dive-cover/dive-cover.component';
import { AnnualComponent } from './annual/annual.component';
import { AnnualFreediverComponent } from './annual-freediver/annual-freediver.component';
import { TemporaryComponent } from './temporary/temporary.component';
import { RemoveHtmlTagsPipe } from './remove-html-tags.pipe';
import { MedicineComponent } from './medicine/medicine.component';
import { PartnerProgramsComponent } from './partner-programs/partner-programs.component';
import { ResearchComponent } from './research/research.component';
import { ReportIncidentComponent } from './report-an-incident/report-an-incident.component';
import { TravelStatementComponent } from './travel-statement/travel-statement.component';
import { ReplacePipe } from './replace.pipe';
import { CommercialComponent } from './commercial/commercial.component';
import { TestStationResourcesComponent } from './test-station-resources/test-station-resources.component';
import { LoaderComponent } from './loader/loader.component';
import { InfographicsComponent } from './infographics/infographics.component';
import { CancellationRequestComponent } from './cancellation-request/cancellation-request.component';
import { StudentComponent } from './student/student.component';
import { WebinarsComponent } from './webinars/webinars.component';
import { TravelNotificationComponent } from './travel-notification/travel-notification.component';
import { TechnicalDivingComponent } from './technical-diving/technical-diving.component';
import { TravelNotificationThankYouComponent } from './travel-notification-thank-you/travel-notification-thank-you.component';
import { InfographicThirteenWaysToRunOutOfAirComponent } from './infographic-thirteen-ways-to-run-out-of-air/infographic-thirteen-ways-to-run-out-of-air.component';
import { InfographicMoreWaterLessBubblesComponent } from './infographic-more-water-less-bubbles/infographic-more-water-less-bubbles.component';
import { InfographicPropellersCanKillComponent } from './infographic-propellers-can-kill/infographic-propellers-can-kill.component';
import { InfographicSevenMistakesComponent } from './infographic-seven-mistakes/infographic-seven-mistakes.component';
import { InfographicReleaseThePressureComponent } from './infographic-release-the-pressure/infographic-release-the-pressure.component';
import { InfographicSafetyInTheAirComponent } from './infographic-safety-in-the-air/infographic-safety-in-the-air.component';
import { InfographicAgingDiverComponent } from './infographic-aging-diver/infographic-aging-diver.component';
import { InfographicLostAtSeaComponent } from './infographic-lost-at-sea/infographic-lost-at-sea.component';
import { InfographicDiabetesComponent } from './infographic-diabetes/infographic-diabetes.component';
import { InfographicFatalitiesComponent } from './infographic-fatalities/infographic-fatalities.component';
import { InfographicFlyingComponent } from './infographic-flying/infographic-flying.component';
import { InfographicPfoComponent } from './infographic-pfo/infographic-pfo.component';
import { InfographicOxygenCourseComponent } from './infographic-oxygen-course/infographic-oxygen-course.component';
import { InfographicBasicLifeSupportComponent } from './infographic-basic-life-support/infographic-basic-life-support.component';
import { InfographicAnnualMembershipComponent } from './infographic-annual-membership/infographic-annual-membership.component';
import { InfographicTempMembershipComponent } from './infographic-temp-membership/infographic-temp-membership.component';
import { InfographicStudentComponent } from './infographic-student/infographic-student.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { FitnessComponent } from './fitness/fitness.component';
import { HealthStatusComponent } from './health-status/health-status.component';
import { PeriodOfInactivityComponent } from './period-of-inactivity/period-of-inactivity.component';
import { RefreshYouSkillsComponent } from './refresh-you-skills/refresh-you-skills.component';
import { TravelSafelyComponent } from './travel-safely/travel-safely.component';
import { SafetyAssessmentChamberOperationsComponent } from './safety-assessment-chamber-operations/safety-assessment-chamber-operations.component';
import { SafetyTrainingChamberOperationsComponent } from './safety-training-chamber-operations/safety-training-chamber-operations.component';
import { ProviderCoursesComponent } from './provider-courses/provider-courses.component';
import { InstructorCoursesComponent } from './instructor-courses/instructor-courses.component';
import { InstructorCourseFilesComponent } from './instructor-course-files/instructor-course-files.component';
import { ProviderCourseFilesComponent } from './provider-course-files/provider-course-files.component';
import { ItCourseFilesComponent } from './it-course-files/it-course-files.component';
import { GearRentalComponent } from './gear-rental/gear-rental.component';
import { AnnualApplicationComponent } from './annual-application/annual-application.component';		
import { StudentApplicationComponent } from './student-application/student-application.component';
import { LoginComponent } from './login/login.component';
import { LoginDashboardComponent } from './member_dashboard/dashboard/dashboard.component';
import { PersonalInfo } from './member_dashboard/personal_info/personal.component';
import { PaymentComponent } from './member_dashboard/payment/payment.component';  	
import { PayRenewalComponent } from './member_dashboard/pay_renewal/pay_renewal.component';  	
import { PaynowComponent } from './member_dashboard/paynow/paynow.component';   	   
import { MembershipInfo } from './member_dashboard/membership_info/membership.component';
import { AddressInfo } from './member_dashboard/address_info/address.component';
import { KinInfo } from './member_dashboard/kin_info/kin.component';
import { StudentMemberAnnual } from './member_dashboard/student_member_annual/student_member_annual.component';
import { UpgradeMemberAnnual } from './member_dashboard/upgrade_member_annual/upgrade_member_annual.component';
import { DivingFamily } from './member_dashboard/diving_family/diving_family.component';
import { NonDivingFamily } from './member_dashboard/non_diving_family/non_diving_family.component';
import { BankDetailsMember } from './member_dashboard/bank_details/bank_details.component';
import { InstructorMember } from './member_dashboard/instructor/instructor.component';
import { QualificationsMember } from './member_dashboard/qualifications/qualifications.component';
import { ProviderMember } from './member_dashboard/provider/provider.component';	
import { InstructorStudent } from './member_dashboard/instructor_students/inst_student.component';
import { IndustryPartner } from './member_dashboard/industry_partner/industry_partner.component';		  
import { DiveCentrePartner } from './member_dashboard/dive_centre_partner/dive-centre-partner.component';		    
import { ProfileMember } from './member_dashboard/profile/profile.component';  
import { SidebarComponent } from './member_dashboard/sidebar/sidebar.component';
import { ApplicationSubmitSuccessComponent } from './application-submit-success/application-submit-success.component';
import { CancellationSurveyComponent } from './cancellation-survey/cancellation-survey.component';
import { SafetyResourcesChamberOperatorsComponent } from './safety-resources-chamber-operators/safety-resources-chamber-operators.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutShippingComponent } from './checkout-shipping/checkout-shipping.component';
import { CheckoutSignInComponent } from './checkout-sign-in/checkout-sign-in.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutConfirmationComponent } from './checkout-confirmation/checkout-confirmation.component';
import { AccountComponent } from './account/account.component';
import { AccountSignoutComponent } from './account-signout/account-signout.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { AccountSigninComponent } from './account-signin/account-signin.component';
import { AccountRegisterComponent } from './account-register/account-register.component';
import { AccountForgotPasswordComponent } from './account-forgot-password/account-forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { DiveCentrePartnerComponent } from './dive-centre-partner/dive-centre-partner.component';
import { DiveCentrePartnerApplicationComponent } from './dive-centre-partner-application/dive-centre-partner-application.component';
import { DiveCentrePartnerClientRegistrationFormComponent } from './dive-centre-partner-client-registration-form/dive-centre-partner-client-registration-form.component';
import { OperationalSafetyResourcesComponent } from './operational-safety-resources/operational-safety-resources.component';
import { AccountSidebarComponent } from './account-sidebar/account-sidebar.component';
import { AccountOrderDetailComponent } from './account-order-detail/account-order-detail.component';
import { AccountAddressesComponent } from './account-addresses/account-addresses.component';
import { AccountAddressEditComponent } from './account-address-edit/account-address-edit.component';
import { AccountPersonalDetailsComponent } from './account-personal-details/account-personal-details.component';
import { AccountChangePasswordComponent } from './account-change-password/account-change-password.component';
import { DanshopSearchComponent } from './danshop-search/danshop-search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DanshopSearchBarComponent } from './danshop-search-bar/danshop-search-bar.component';
// import { CommonApplicationComponent } from './common-application/common-application.component';
// import { VerifyApplicationComponent } from './verify-application/verify-application.component';
import { AuthenticationService } from './authentication.service';
import { ContactComponent } from './contact/contact.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { LogoPolicyComponent } from './logo-policy/logo-policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { CheckoutPaymentRedirectComponent } from './checkout-payment-redirect/checkout-payment-redirect.component';
import { AccountNewAddressComponent } from './account-new-address/account-new-address.component';
import { DanshopSubFooterComponent } from './danshop-sub-footer/danshop-sub-footer.component';
import { BlogComponent } from './blog/blog.component';
import { InternPackagesComponent } from './intern-packages/intern-packages.component';
import { DanshopReturnsComponent } from './danshop-returns/danshop-returns.component';
import { AffilateComponent } from './affilate/affilate.component';
import { DanshopWishlistComponent } from './danshop-wishlist/danshop-wishlist.component';  
import { DanshopSitemapComponent } from './danshop-sitemap/danshop-sitemap.component';
import { DanshopGiftCertificatesComponent } from './danshop-gift-certificates/danshop-gift-certificates.component';
import { DansadansaorgComponent } from './dansadansaorg/dansadansaorg.component';
import { FindADiveDoctorComponent } from './find-a-dive-doctor/find-a-dive-doctor.component';
import { FindADanInstructorComponent } from './find-a-dan-instructor/find-a-dan-instructor.component';
import { HiraProgramComponent } from './hira-program/hira-program.component';
import { IndustryPartnersComponent } from './industry-partners/industry-partners.component';
import { IndustryPartnerApplicationComponent } from './industry-partner-application/industry-partner-application.component';
import { MalariaComponent } from './malaria/malaria.component';
import { PhysicianNetworkComponent } from './physician-network/physician-network.component';
import { ChamberNetworkComponent } from './chamber-network/chamber-network.component';
import { MedicalResourcesComponent } from './medical-resources/medical-resources.component';
import { CurrentProjectsComponent } from './current-projects/current-projects.component';
import { OnlineSeminarsComponent } from './online-seminars/online-seminars.component';
import { CompletedProjectsComponent } from './completed-projects/completed-projects.component';
import { FormatOrderStatePipe } from './format-order-state.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    InnerHeaderComponent,
    CovidNineteenComponent,
    SubFooterComponent,
    ReturnComponent,
    OurTeamComponent,
    InternationalDanComponent,
    AlertDriverComponent,
    ServicesComponent,
    DansorgLayoutComponent,
    DansorgInnerLayoutComponent,
    DanshopLayoutComponent,
    DanshopHomeComponent,
    DanshopHeaderComponent,
    DanshopFooterComponent,
    AboutComponent,
    DanshopMenuComponent,
    ProductsComponent,
    ProductDetailsComponent,
    DanshopInnerLayoutComponent,
    DanshopInnerHeaderComponent,
    CartComponent,
    DanshopMemberInformationComponent,
    DanshopAboutComponent,
    DanshopTermsConditionsComponent,
    DanshopPrivacyPolicyComponent,
    DanshopDeliveryShippingComponent,
    DanshopReturnInformationComponent,
    ChamberSafetyComponent,
    DiveMedicalFormsComponent,
    AnnualDivingReportComponent,
    LegalNetworkComponent,
    RequestLegalAdviceComponent,
    EducationComponent,
    DanResourcesComponent,
    CategoryComponent,
    AllproductsComponent,
    DanshopContactUsComponent,
    DiveCoverComponent,
    AnnualComponent,
    AnnualFreediverComponent,
    TemporaryComponent,
    RemoveHtmlTagsPipe,
    MedicineComponent,
    PartnerProgramsComponent,
    ResearchComponent,
    ReportIncidentComponent,
    TravelStatementComponent,
    ReplacePipe,
    CommercialComponent,
    TestStationResourcesComponent,
    LoaderComponent,
    InfographicsComponent,
    CancellationRequestComponent,
    StudentComponent,
    WebinarsComponent,
    TravelNotificationComponent,
    TechnicalDivingComponent,
    TravelNotificationThankYouComponent,
    InfographicThirteenWaysToRunOutOfAirComponent,
    InfographicMoreWaterLessBubblesComponent,
    InfographicPropellersCanKillComponent,
    InfographicSevenMistakesComponent,
    InfographicReleaseThePressureComponent,
    InfographicSafetyInTheAirComponent,
    InfographicAgingDiverComponent,
    InfographicLostAtSeaComponent,
    InfographicDiabetesComponent,
    InfographicFatalitiesComponent,
    InfographicFlyingComponent,
    InfographicPfoComponent,
    InfographicOxygenCourseComponent,
    InfographicBasicLifeSupportComponent,
    InfographicAnnualMembershipComponent,
    InfographicTempMembershipComponent,
    InfographicStudentComponent,
    EquipmentComponent,
    FitnessComponent,
    HealthStatusComponent,
    PeriodOfInactivityComponent,
    RefreshYouSkillsComponent,
    TravelSafelyComponent,
    SafetyAssessmentChamberOperationsComponent,
    SafetyTrainingChamberOperationsComponent,
    ProviderCoursesComponent,
    InstructorCoursesComponent,
    InstructorCourseFilesComponent,
    ProviderCourseFilesComponent,
    ItCourseFilesComponent,
    GearRentalComponent,
    LoginComponent,
    LoginDashboardComponent,  
    PersonalInfo,
	PaymentComponent,  
    PayRenewalComponent,
	PaynowComponent,  	
    MembershipInfo,
    AddressInfo,
    KinInfo,
    StudentMemberAnnual,
    UpgradeMemberAnnual,
    DivingFamily,
    NonDivingFamily,
    BankDetailsMember,
    InstructorMember,
    QualificationsMember,
    ProviderMember,
    InstructorStudent,
    IndustryPartner,
	DiveCentrePartner,			
    ProfileMember,  	
    SidebarComponent,
    AnnualApplicationComponent,
    StudentApplicationComponent,
    ApplicationSubmitSuccessComponent,
    CancellationSurveyComponent,
    SafetyResourcesChamberOperatorsComponent,
    CheckoutComponent,
    CheckoutShippingComponent,
    CheckoutSignInComponent,
    CheckoutPaymentComponent,
    CheckoutConfirmationComponent,
    AccountComponent,
    AccountSignoutComponent,
    AccountDashboardComponent,
    AccountSigninComponent,
    AccountRegisterComponent,
    AccountForgotPasswordComponent,
    ResetPasswordComponent,
    AccountOrdersComponent,
    DiveCentrePartnerComponent,
    DiveCentrePartnerApplicationComponent,
    DiveCentrePartnerClientRegistrationFormComponent,
    OperationalSafetyResourcesComponent,
    AccountSidebarComponent,
    AccountOrderDetailComponent,
    AccountAddressesComponent,
    AccountAddressEditComponent,
    AccountPersonalDetailsComponent,
    AccountChangePasswordComponent,
    DanshopSearchComponent,
    PageNotFoundComponent,
    DanshopSearchBarComponent,
    // CommonApplicationComponent,
    // VerifyApplicationComponent,
    ContactComponent,
    CopyrightComponent,
    LogoPolicyComponent,
    PrivacyPolicyComponent,
    CheckoutPaymentRedirectComponent,
    AccountNewAddressComponent,
    DanshopSubFooterComponent,
    BlogComponent,
    InternPackagesComponent,
    DanshopReturnsComponent,
    AffilateComponent,
    DanshopWishlistComponent,
    DanshopSitemapComponent,
    DanshopGiftCertificatesComponent,
    DansadansaorgComponent,
    FindADiveDoctorComponent,
    FindADanInstructorComponent,
    HiraProgramComponent,
    IndustryPartnersComponent,
    IndustryPartnerApplicationComponent,
    MalariaComponent,
    PhysicianNetworkComponent,
    ChamberNetworkComponent,
    MedicalResourcesComponent,
    CurrentProjectsComponent,
    OnlineSeminarsComponent,
    CompletedProjectsComponent,
	FormatOrderStatePipe,
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    GraphQLModule,
    HttpClientModule,
	FormsModule,
	ReactiveFormsModule,
	RecaptchaV3Module, 
    ToastrModule.forRoot({
      timeOut: 2000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),
    
    BrowserAnimationsModule,
         AppRoutingModule,
    ],
 // providers: [CartService, ActiveCustomerService, AuthenticationService],
    providers: [{
        provide: RECAPTCHA_V3_SITE_KEY,
        useValue: "6LfMMEIpAAAAANVAtkKcYrveEydHPkqWcqjgM5Pl",   
    },CartService, ActiveCustomerService, AuthenticationService ],  
  bootstrap: [AppComponent]  
})
export class AppModule { }

