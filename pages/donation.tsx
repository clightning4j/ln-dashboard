import { GetInfoNode } from "../model/GetInfoNode";
import APIProvider from "../api/APIProvider";
import { GetServerSideProps } from "next";
import { ListOffers, OfferInfo } from "../model/CoreLN";
import DonationView from "../components/donation/DonationView.component";
import ModelProvider from "../model/ModelProvider";
import axios from "axios";

type DonationViewProps = {
  listOffers: ListOffers | null;
  offer: OfferInfo | null;
  error: any | null;
  info: GetInfoNode | null;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  let offers = null;
  let info = ModelProvider.getNodeInfo();
  try {
    offers = await APIProvider.api().listOffers(true);
  } catch (e) {
    console.error(e);
    return {
      props: {
        listOffers: null,
        offer: null,
        info: info,
        error: e,
      },
    };
  }
  // TODO make this code safe.
  return {
    props: {
      listOffers: offers,
      offer: offers!.offers[0],
      error: null,
      info: info,
    },
  };
};

export default function DonationPage({
  listOffers,
  info,
  offer,
  error,
}: DonationViewProps) {
  if (error) {
    //TODO adding an error view
    return <></>;
  }
  return <DonationView nodeInfo={info} listOffers={listOffers} offer={offer} />;
}
