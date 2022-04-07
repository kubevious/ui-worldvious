
import { 
    WorldviousNotificationKind,
    WorldviousFeedbackRequest,
    WorldviousFeedbackQuestionKind,
    WorldviousNewVersionInfo,
    WorldviousMessageData

} from '@kubevious/ui-middleware/dist/services/worldvious';

export const TEST_NEW_VERSION : WorldviousNewVersionInfo = {
    kind: WorldviousNotificationKind.newVersion,
    name: 'KUBEVIOUS',
    version: 'v999',
    url: 'https://github.com/kubevious/kubevious',
    changes: ['change 1', 'change 2', 'change 3'],
    features: ['feature 1', 'feature 2', 'feature 3'],
    content:
`Kubevious also provides hints to operators to avoid and identify configurational and operational errors.

# Intro Video
<!-- ![Kubevious Intro Video](https://github.com/kubevious/media/raw/master/videos/intro.gif) -->
<a href="https://youtu.be/YVBjt-9ugTg" target="_blank">
<img src="https://github.com/kubevious/media/raw/master/videos/intro.gif" />
</a>

See the collection of other demo videos: https://www.youtube.com/channel/UCTjfcEFrGjqtSGtry4ySUzQ

# Live Demo
See our live demo running on a model cluster: [https://demo.kubevious.io](https://demo.kubevious.io).

# Running Kubevious
Kubevious works with any Kubernetes distribution and runs within the cluster. Deploy using Helm v3.2+:

\`\`\`sh
kubectl create namespace kubevious

helm repo add kubevious https://helm.kubevious.io

helm upgrade --atomic -i kubevious kubevious/kubevious --version 0.8.15 -n kubevious

kubectl port-forward $(kubectl get pods -n kubevious -l "app.kubernetes.io/component=kubevious-ui" -o jsonpath="{.items[0].metadata.name}") 8080:80 -n kubevious 
\`\`\`
Access from browser: http://localhost:8080

For more details on installation options visit [Deployment Repository].

# Running Kubevious Outside the Cluster
While **Kubevious** was made to run inside the cluster and monitor the cluster it lives in, **[Kubevious Portable](https://github.com/kubevious/portable)** version runs outside the cluster. Usually, that would happen on development machines from where operators would run *kubectl* commands. Kubevious Portable runs inside a single docker container. Kubevious Portable does not have Rule Executing and Time Machine capabilities and is meant for quick sanity check and visualization of Kubernetes clusters and applications. Kubevious Portable connects to clusters defined in kube-config files.
`
}

export const TEST_FEEDBACK_QUESTIONS : WorldviousFeedbackRequest = {
    "kind": WorldviousNotificationKind.feedbackRequest,
    "id": "7654e321-e89b-12d3-a456-426614174000",
    "questions": [
        {
            "id": "ease-of-use",
            "kind": WorldviousFeedbackQuestionKind.rate,
            "text": "How do you like the easy of use?"
        },
        {
            "id": "new-functionality",
            "kind": WorldviousFeedbackQuestionKind.single_select,
            "text": "Is there some additional functionality you want to see in Kubevious?",
            "options": ["Yes", "No"]
        },
        {
            "id": "other-products",
            "kind": WorldviousFeedbackQuestionKind.multi_select,
            "text": "What other tools do you use along with Kubevious? Check all that apply.",
            "options": ["kubectl", "Dashboard", "Lens", "Octant"]
        },
        {
            "id": "comments",
            "kind": WorldviousFeedbackQuestionKind.input,
            "text": "Comment your Kubevious experience"
        },
    ]
}

export const TEST_MESSAGE_NOTIFICATION : WorldviousMessageData = {
    "kind": WorldviousNotificationKind.message,
    "id": "7654e321-e89b-12d3-a456-426614174000",
    "title": "Hello from Kubevious",
    "content": 
`
## Full Text Search

![Full Text Search](https://github.com/kubevious/media/raw/master/screens/full-text-search.png)

Looking for a particular configuration in Kubernetes haystack takes lots of time. 

Kubevious supports full text across across entire cluster.

## Perform Capacity Planning and Optimize Resource Usage
![Perform Capacity Planning and Optimize Resource Usage](https://github.com/kubevious/media/raw/master/screens/capacity-planning.png)

Clearly identify how much resources are taken by each container, pod, deployment, daemonset, namespace, etc. 

Kubevious renders not only absolute resource request values, but also relative usage per node, namespace and entire cluster. Identify which apps take most resources within the namespace.
`
}