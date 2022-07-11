const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (event === undefined) return TRIVIAL_PARTITION_KEY

  let candidate = setCandidate(event)

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = encode(candidate)
  }

  return candidate;
};

function setCandidate(event) {
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = encode(data)
    }
  }
  return candidate
}

function encode(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

/*
simplified logic to check for existence of event object at the top of deterministicPartitionKey into a guard clause

created setCandidates function and extracted logic into it's own function

extracted hashing functionality into it's own function encode since it's repeated logic. Keeping code DRY. 
*/