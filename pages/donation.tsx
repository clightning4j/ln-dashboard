import { GetInfoNode } from "../model/GetInfoNode";
import APIProvider from "../api/APIProvider";
import { GetServerSideProps } from "next";
import { ListOffers, OfferInfo } from "../model/CoreLN";
import DonationView from "../components/donation/DonationView.component";
import ModelProvider from "../model/ModelProvider";

type DonationViewProps = {
  listOffers: ListOffers | null;
  offer: OfferInfo | null;
  error: any | null;
  nodeInfo: GetInfoNode | null;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  let offers = null;
  let nodeInfo = null;
  try {
    offers = await APIProvider.api().listOffers(true);
    nodeInfo = await APIProvider.api().getInfo();
    ModelProvider.setNodeInfo(nodeInfo);
  } catch (e) {
    console.error(e);
    return {
      props: {
        listOffers: null,
        offer: null,
        nodeInfo: nodeInfo,
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
      nodeInfo: nodeInfo,
    },
  };
};

export default function DonationPage({
  listOffers,
  nodeInfo,
  offer,
  error,
}: DonationViewProps) {
  if (error) {
    //TODO adding an error view
    return <></>;
  }
  console.debug("List of offers from the command: lightning-listoffers: ");
  console.debug(listOffers);
  return <DonationView nodeInfo={nodeInfo} listOffers={listOffers} offer={offer} />;
}
