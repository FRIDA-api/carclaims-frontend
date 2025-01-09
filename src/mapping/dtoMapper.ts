import {
  VehicleDriver,
  Policyholder,
  PersonFormOfAddressEnum,
  PersonTitleEnum,
  VehicleDriverDriverDamagedpartsGraphicEnum,
  VehicleDriverVehicleDrivingAbilityEnum,
  VehicleDriverDamageCausedByEnum,
  Claimsdata,
  ClaimsdataLanguageEnum,
  ClaimsdataInjuredPersonEnum,
  ClaimsdataWitnessExistsEnum,
  PolicyholderInputTaxDeductionEnum,
  PolicyholderComprehensiveInsuranceEnum,
  Witness,
  ClaimsdataHasVehicleDamageEnum,
  VehicleDriverDamagedCarImagesInner,
} from '../api';
import {
  CarclaimsDetailsState,
  DriverOfInsuranceHolderFormState,
  DriverOfOtherInsuranceHolderFormState,
  InjuredPeopleFormState,
  InsuranceHolderFormState,
  MiscellaneousDamagesFormState,
  OtherInsuranceHolderFormState,
  WitnessDetails,
} from '../types';
import dayjs from 'dayjs';

function createImageBase64(
  imgsURL: string[],
  files: File &
    {
      path?: string;
    }[]
): { file: string; path: string }[] {
  return imgsURL.map((url: string, index: number) => {
    const base64Data = url.split(',')[1];

    return {
      file: base64Data,
      path: files[index]?.path || 'Hello', // Verwende den Pfad aus files oder 'Hello' als Fallback
    };
  });
}

export function mapDTO(): Claimsdata {
  // Log Session Storage Objects
  // console.log('carclaimsDetails');
  // console.log(JSON.parse(sessionStorage.getItem('carclaimsDetails')!));
  // console.log('insurance-holder-a');
  // console.log(JSON.parse(sessionStorage.getItem('insurance-holder-a')!));
  // console.log('driver-a');
  // console.log(JSON.parse(sessionStorage.getItem('driver-a')!));
  // console.log('injuredDetails');
  // console.log(JSON.parse(sessionStorage.getItem('injuredDetails')!));
  // console.log('miscellaneousDamages');
  // console.log(JSON.parse(sessionStorage.getItem('miscellaneousDamages')!));
  // console.log('insurance-holder-b');
  // console.log(JSON.parse(sessionStorage.getItem('insurance-holder-b')!));
  // console.log('driver-b');
  // console.log(JSON.parse(sessionStorage.getItem('driver-b')!));
  // console.log('witness');
  // console.log(JSON.parse(sessionStorage.getItem('witness')!));

  // Objekte instanzieren
  let vehicleDriver: VehicleDriver = {};
  let otherVehicleDriver: VehicleDriver = {};
  let policyholder: Policyholder = {};
  let otherPolicyholder: Policyholder = {};
  let witness: Witness[] = [];
  //  Variablen instanzieren
  let existingWitness: string | undefined;
  let witnessesCount: string | undefined;

  //Driver A
  const driverHolderString = sessionStorage.getItem('driver-a');
  if (driverHolderString) {
    const {
      driverSalutation,
      driverHolderSurName,
      driverHolderName,
      driverHolderPostalCode,
      driverHolderPlace,
      driverHolderStreet,
      driverHolderStreetNr,
      driverHolderTelephone,
      driverHolderDriverLicense,
      driverHolderIssuer,
      driverHolderVisibleDamage,
      driverHolderNotes,
      victimReadyToDrive,
    }: DriverOfInsuranceHolderFormState = JSON.parse(driverHolderString);

    const driverHolderFileUploads = JSON.parse(driverHolderString);
    const {
      imgsURL,
      files,
    }: {
      imgsURL: string[];
      files: File &
      {
        path?: string;
      }[];
    } = driverHolderFileUploads;

    const driverholderImgs: Array<VehicleDriverDamagedCarImagesInner> =
      createImageBase64(imgsURL, files);

    vehicleDriver = {
      personalInformation: {
        formOfAddress:
          driverSalutation === 'Herr'
            ? PersonFormOfAddressEnum.Herr
            : PersonFormOfAddressEnum.Frau, //Das Mapping der Enums muss angepasst werden not_specified ?
        title: PersonTitleEnum.Dr, //Existiert nicht im Front End
        lastName: driverHolderSurName,
        firstName: driverHolderName,
        postalCode: driverHolderPostalCode,
        city: driverHolderPlace,
        streetName: driverHolderStreet,
        streetNumber: driverHolderStreetNr,
        phoneNumber: driverHolderTelephone,
        emailAddress: 'bob.brown@example.com', //Existiert nicht im Front End
      },
      driverLicensenumber: driverHolderDriverLicense,
      licenseIssuedBy: driverHolderIssuer,

      damagedCarImages: driverholderImgs,
      damagedWindowImages: [],
      driverDamagedpartsGraphic: [
        VehicleDriverDriverDamagedpartsGraphicEnum.Dach,
      ],

      driverVisibleDamage: driverHolderVisibleDamage,
      driverComments: driverHolderNotes,
      vehicleDrivingAbility:
        victimReadyToDrive === 'Yes'
          ? VehicleDriverVehicleDrivingAbilityEnum.True
          : VehicleDriverVehicleDrivingAbilityEnum.False, //Das Mapping der Enums muss angepasst werden not_specified ?
      damageCausedBy: [VehicleDriverDamageCausedByEnum.Abbiegen], //whichDamageToVictim //Das Mapping der Enums muss angepasst werden not_specified ?
      typeOfWildlife: 'Deer', //Existiert nicht im Front End
      certificateForWildlife: 'wildlife_certificate.pdf', //Existiert nicht im Front End
      garageLocation: 'Garage 1', //Existiert nicht im Front End
    };
  }
  //Driver B
  const driverHolderOtherString = sessionStorage.getItem('driver-b');
  if (driverHolderOtherString) {
    const driverHolderOther: DriverOfOtherInsuranceHolderFormState = JSON.parse(
      driverHolderOtherString
    );
    const {
      otherDriverSalutation,
      otherDriverHolderSurName,
      otherDriverHolderName,
      otherDriverHolderPostalCode,
      otherDriverHolderPlace,
      otherDriverHolderStreet,
      otherDriverHolderStreetNr,
      otherDriverHolderTelephone,
      otherDriverHolderDriverLicense,
      otherDriverHolderIssuer,
      otherDriverHolderVisibleDamage,
      otherDriverHolderNotes,
      otherVictimReadyToDrive,
    } = driverHolderOther;

    const otherDriverHolderFileUploads = JSON.parse(driverHolderOtherString);
    const {
      imgsURL,
      files,
    }: {
      imgsURL: string[];
      files: File &
      {
        path?: string;
      }[];
    } = otherDriverHolderFileUploads;

    const otherDriverholderImgs: Array<VehicleDriverDamagedCarImagesInner> =
      createImageBase64(imgsURL, files);

    otherVehicleDriver = {
      personalInformation: {
        formOfAddress:
          otherDriverSalutation === 'Herr'
            ? PersonFormOfAddressEnum.Herr
            : PersonFormOfAddressEnum.Frau, //Das Mapping der Enums muss angepasst werden not_specified ?
        title: PersonTitleEnum.Dr, //Existiert nicht im Front End
        lastName: otherDriverHolderSurName,
        firstName: otherDriverHolderName,
        postalCode: otherDriverHolderPostalCode,
        city: otherDriverHolderPlace,
        streetName: otherDriverHolderStreet,
        streetNumber: otherDriverHolderStreetNr,
        phoneNumber: otherDriverHolderTelephone,
        emailAddress: 'bob.brown@example.com', //Existiert nicht im Front End
      },
      driverLicensenumber: otherDriverHolderDriverLicense,
      licenseIssuedBy: otherDriverHolderIssuer,
      damagedCarImages: otherDriverholderImgs,
      damagedWindowImages: [],
      driverDamagedpartsGraphic: [
        VehicleDriverDriverDamagedpartsGraphicEnum.Dach,
      ],
      driverVisibleDamage: otherDriverHolderVisibleDamage,
      driverComments: otherDriverHolderNotes,
      vehicleDrivingAbility:
        otherVictimReadyToDrive === 'Yes'
          ? VehicleDriverVehicleDrivingAbilityEnum.True
          : VehicleDriverVehicleDrivingAbilityEnum.False, //Das Mapping der Enums muss angepasst werden not_specified ?
      damageCausedBy: [VehicleDriverDamageCausedByEnum.Abbiegen], //driverHolderOther.otherWhichDamageToVictim //Das Mapping der Enums muss angepasst werden not_specified ?
      typeOfWildlife: 'Deer', //Existiert nicht im Front End
      certificateForWildlife: 'wildlife_certificate.pdf', //Existiert nicht im Front End
      garageLocation: 'Garage 1', //Existiert nicht im Front End
    };
  }

  //Policyholder A
  const insuranceHolderString = sessionStorage.getItem('insurance-holder-a');
  if (insuranceHolderString) {
    const insuranceHolder: InsuranceHolderFormState = JSON.parse(
      insuranceHolderString
    );
    const {
      insuranceHolderSalutation,
      insuranceHolderSurName,
      insuranceHolderName,
      insuranceHolderPostalCode,
      insuranceHolderPlace,
      insuranceHolderStreet,
      insuranceHolderStreetNr,
      insuranceHolderTelephone,
      insuranceHolderEmail,
      carBrand,
      carModel,
      licenseNumber,
      insuranceCompany,
      insuranceID,
      chassisNr,
      currentKM,
      greenCardNr,
      validDateGreenCard,
      allRiskInsurance,
    } = insuranceHolder;

    policyholder = {
      personalInformation: {
        formOfAddress: insuranceHolderSalutation === 'Herr'
          ? PersonFormOfAddressEnum.Herr
          : PersonFormOfAddressEnum.Frau,//Das Mapping der Enums muss angepasst werden not_specified ?
        title: PersonTitleEnum.Dr, //Existiert nicht im Front End
        lastName: insuranceHolderSurName,
        firstName: insuranceHolderName,
        postalCode: insuranceHolderPostalCode,
        city: insuranceHolderPlace,
        streetName: insuranceHolderStreet,
        streetNumber: insuranceHolderStreetNr,
        phoneNumber: insuranceHolderTelephone,
        emailAddress: insuranceHolderEmail,
      },
      inputTaxDeduction: PolicyholderInputTaxDeductionEnum.False, // Das Mapping der Enums muss angepasst werden not_specified ?
      vehicleMake: carBrand,
      vehicleType: carModel,
      vehicleReg: licenseNumber,
      insuranceCompany: insuranceCompany,
      policyNumber: insuranceID,
      vin: chassisNr,
      currentMileage: currentKM ? parseInt(currentKM) : undefined,
      greencardNumber: greenCardNr,
      greencardExpirydate: validDateGreenCard
        ? dayjs.isDayjs(validDateGreenCard)
          ? validDateGreenCard.toDate()
          : undefined
        : undefined,
      comprehensiveInsurance:
        allRiskInsurance === 'Ja'
          ? PolicyholderComprehensiveInsuranceEnum.True
          : PolicyholderComprehensiveInsuranceEnum.False, // Das Mapping der Enums muss angepasst werden not_specified ?
    };
  }
  //Policyholder B
  const otherInsuranceHolderString =
    sessionStorage.getItem('insurance-holder-b');
  if (otherInsuranceHolderString) {
    const otherInsuranceHolder: OtherInsuranceHolderFormState = JSON.parse(
      otherInsuranceHolderString
    );
    const {
      otherInsuranceHolderSalutation,
      otherInsuranceHolderSurName,
      otherInsuranceHolderName,
      otherInsuranceHolderPostalCode,
      otherInsuranceHolderPlace,
      otherInsuranceHolderStreet,
      otherInsuranceHolderStreetNr,
      otherInsuranceHolderTelephone,
      otherInsuranceHolderEmail,
      otherCarBrand,
      otherCarModel,
      otherLicenseNumber,
      otherInsuranceCompany,
      otherInsuranceID,
      otherChassisNr,
      otherCurrentKM,
      otherGreenCardNr,
      otherValidDateGreenCard,
      otherAllRiskInsurance,
    } = otherInsuranceHolder;

    otherPolicyholder = {
      personalInformation: {
        formOfAddress: otherInsuranceHolderSalutation === "Herr"
        ?  PersonFormOfAddressEnum.Herr
        : PersonFormOfAddressEnum.Frau, //Das Mapping der Enums muss angepasst werden not_specified ?
        title: PersonTitleEnum.Dr, //Existiert nicht im Front End
        lastName: otherInsuranceHolderSurName,
        firstName: otherInsuranceHolderName,
        postalCode: otherInsuranceHolderPostalCode,
        city: otherInsuranceHolderPlace,
        streetName: otherInsuranceHolderStreet,
        streetNumber: otherInsuranceHolderStreetNr,
        phoneNumber: otherInsuranceHolderTelephone,
        emailAddress: otherInsuranceHolderEmail,
      },
      inputTaxDeduction: PolicyholderInputTaxDeductionEnum.False, // Das Mapping der Enums muss angepasst werden not_specified ?
      vehicleMake: otherCarBrand,
      vehicleType: otherCarModel,
      vehicleReg: otherLicenseNumber,
      insuranceCompany: otherInsuranceCompany,
      policyNumber: otherInsuranceID,
      vin: otherChassisNr,
      currentMileage: otherCurrentKM ? parseInt(otherCurrentKM) : undefined,
      greencardNumber: otherGreenCardNr,
      greencardExpirydate: otherValidDateGreenCard
        ? dayjs.isDayjs(otherValidDateGreenCard)
          ? otherValidDateGreenCard.toDate()
          : undefined
        : undefined,
      comprehensiveInsurance:
        otherAllRiskInsurance === 'Ja'
          ? PolicyholderComprehensiveInsuranceEnum.True
          : PolicyholderComprehensiveInsuranceEnum.False, // Das Mapping der Enums muss angepasst werden not_specified ?
    };
  }

  //Witness
  const witnessesString = sessionStorage.getItem('witness');
  if (witnessesString) {
    const witnesses: WitnessDetails[] = JSON.parse(witnessesString).witnesses;
    existingWitness = JSON.parse(witnessesString).existingWitness;
    witnessesCount = JSON.parse(witnessesString).witnessesCount;

    witness = witnesses.map((witnesses) => {
      return {
        personalInformation: {
          formOfAddress:
            witnesses.salutation === 'Herr'
              ? PersonFormOfAddressEnum.Herr
              : PersonFormOfAddressEnum.Frau, //Das Mapping der Enums muss angepasst werden not_specified ?,
          title: PersonTitleEnum.Dr,
          lastName: witnesses.surName,
          firstName: witnesses.lastName,
          postalCode: witnesses.postalCode,
          city: witnesses.place,
          streetName: witnesses.street,
          streetNumber: witnesses.houseNr,
          phoneNumber: witnesses.telephone,
          emailAddress: witnesses.email,
        },
      };
    });
  }

  //CarclaimsDetailsState
  let carclaimsDetails: CarclaimsDetailsState = {
    language: '',
    accidentDate: null,
    accidentTime: null,
    street: '',
    postalCode: '',
    place: '',
    houseNr: '',
    accidentDetails: '',
    processingNr: '',
  };

  const carclaimsDetailsString = sessionStorage.getItem('carclaimsDetails');
  if (carclaimsDetailsString) {
    carclaimsDetails = JSON.parse(carclaimsDetailsString);

  }

  const {
    language,
    accidentDate,
    accidentTime,
    street,
    postalCode,
    place,
    houseNr,
    accidentDetails,
    processingNr,
  } = carclaimsDetails;

  console.log('CarclaimsDetails: ' + language);

  // InjuredDetailsString
  let injuredDetails: InjuredPeopleFormState = {
    injured: '',
    injuredCount: undefined,
  };

  const injuredDetailsString = sessionStorage.getItem('injuredDetails');
  if (injuredDetailsString) {
    injuredDetails = JSON.parse(injuredDetailsString);
  }

  // MiscellaneousDamages
  let miscellaneousDamagesDetails: MiscellaneousDamagesFormState = {
    otherDamages: null,
    damages: '',
  };

  const miscellaneousDamagesString = sessionStorage.getItem(
    'miscellaneousDamages'
  );
  if (miscellaneousDamagesString) {
    miscellaneousDamagesDetails = JSON.parse(miscellaneousDamagesString);
  }

  //Body des API Requests
  const claimsdata: Claimsdata = {
    language: (() => {
      switch (language) {
        case 'DE':
          return ClaimsdataLanguageEnum.De;
        case 'EN':
          return ClaimsdataLanguageEnum.En;
        case 'FR':
          return ClaimsdataLanguageEnum.Fr;
        case 'ES':
          return ClaimsdataLanguageEnum.Es;
        case 'IT':
          return ClaimsdataLanguageEnum.It;
        case 'NL':
          return ClaimsdataLanguageEnum.Nl;
        case 'PL':
          return ClaimsdataLanguageEnum.Pl;
        default:
          return ClaimsdataLanguageEnum.De; // Default to German if not specified
      }
    })(),
    accidentDate: accidentDate
      ? dayjs.isDayjs(accidentDate)
        ? accidentDate.toDate()
        : undefined
      : undefined,
    accidentTime: accidentTime
      ? dayjs.isDayjs(accidentTime)
        ? accidentTime.format()
        : undefined
      : undefined,
    accidentPostalCode: postalCode,
    accidentCity: place,
    accidentStreetName: street,
    accidentStreetNumber: houseNr,
    accidentDescription: accidentDetails,
    accidentPoliceNumber: processingNr,

    hasVehicleDamage:
      miscellaneousDamagesDetails.otherDamages === '1'
        ? ClaimsdataHasVehicleDamageEnum.True
        : ClaimsdataHasVehicleDamageEnum.False,
    vehicleDamageDescription: miscellaneousDamagesDetails.damages,

    injuredPerson:
      injuredDetails.injured === '1'
        ? ClaimsdataInjuredPersonEnum.True
        : ClaimsdataInjuredPersonEnum.False,
    injuredPersonNumber: injuredDetails.injuredCount?.toString(),

    witnessExists:
      existingWitness === 'Yes'
        ? ClaimsdataWitnessExistsEnum.True
        : ClaimsdataWitnessExistsEnum.False, //Das Mapping der Enums muss angepasst werden not_specified ?
    witnessNumber: witnessesCount?.toString(),
    witness: witness,

    vehicleDriver: vehicleDriver,
    otherVehicleDriver: otherVehicleDriver,
    policyholder: policyholder,
    otherPolicyholder: otherPolicyholder,
  };

  return claimsdata;
}
