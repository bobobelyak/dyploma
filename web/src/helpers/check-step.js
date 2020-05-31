export const checkStep = (step, data) => {
  switch (step) {
    case -1: {
      return Boolean(data && data.longitude && data.latitude);
    }
    case 0: {
      return Boolean(data.image.imageUrl && data.type >= 0 && data.iconImage);
    }
    case 1: {
      const {uaName, enName, enStreet, uaStreet, buildingNumber, uaDescription, enDescription} = data;
      return Boolean(uaName && enName && enStreet && uaStreet && buildingNumber && uaDescription && enDescription);
    }
    default: return true;
  }
};
