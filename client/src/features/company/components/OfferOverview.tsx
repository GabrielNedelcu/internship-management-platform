import OfferStats from "./OfferStats";
import { OfferData } from "common";
import { IOfferData } from "common/types";

interface IOfferOverviewProps {
  offerData: IOfferData;
}

const OfferOverview = ({ offerData }: IOfferOverviewProps) => {
  return (
    <>
      <OfferStats offerId={offerData._id || ""} />
      <OfferData offerData={offerData} companyView={true} />
    </>
  );
};

export default OfferOverview;
