import React, { useEffect, useState } from "react";
import { Slide, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ErrorDialog from "@/components/Modals/errorDialog";
import { usePublishData } from "@/hooks/usePublishData";
import PublishHeader from "@/components/PublishMarket/PublishHeader";
import PublishInputs from "@/components/PublishMarket/PublishInputs";
import PublishingStatus from "@/components/PublishMarket/PublishingStatus";
import { useGlobalContext } from "@/contexts/GlobalContext";

const PublishPage = () => {
  const router = useRouter();
  const { setIndex } = useGlobalContext();

  const {
    file,
    nftTitle,
    description,
    category,
    ethPrice,
    coverImage,
    termsChecked,
    isError,
    errorMessage,
    errorTitle,
    generating,
    prompt,
    progress,
    loading,
    success,
    nftAddress,
    handleInput,
    setPrice,
    handleFileChange,
    generateThumbnail,
    publish,
    closeError,
  } = usePublishData();
  // close
  let values = {
    nftTitle,
    description,
    ethPrice,
    category,
    coverImage,
    prompt,
    termsChecked,
    progress,
  };

  return (
    <Slide direction="left" in={true} style={{ zIndex: 10 }}>
      <Box
        px={5}
        py={[1, 1, 8]}
        color="white"
        mt="4"
        bg="#1f2022"
        rounded="md"
        shadow="md"
      >
        <PublishHeader success={success} />

        {!loading && !success && (
          <PublishInputs
            file={file}
            publish={publish}
            generateThumbnail={generateThumbnail}
            setPrice={setPrice}
            handleFileChange={handleFileChange}
            handleInput={handleInput}
            generating={generating}
            values={values}
            loading={loading}
          />
        )}

        {loading && (
          <PublishingStatus
            isLoading={loading}
            isSuccess={success}
            name={nftTitle}
            progress={progress}
            nftAddress={nftAddress}
          />
        )}

        {success && (
          <PublishingStatus
            isLoading={loading}
            isSuccess={success}
            name={nftTitle}
            progress={progress}
            nftAddress={nftAddress}
            close={() => {
              setIndex(0);
              router.push("/");
            }}
          />
        )}
      </Box>

      <ErrorDialog
        isOpen={isError}
        onClose={closeError}
        title={errorTitle}
        message={errorMessage}
      />
    </Slide>
  );
};

export default PublishPage;
