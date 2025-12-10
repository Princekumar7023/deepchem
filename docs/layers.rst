Layers Cheatsheet
=================

This page provides a compact reference for several commonly used layers in
DeepChem. Each section describes what the layer does, the most important
arguments, and a short example showing the typical usage pattern.

The layout follows the style of the model cheatsheet in ``models.rst`` so that
users can quickly compare different components while building models.

.. contents::
   :local:
   :depth: 1

.. rubric:: How to read this page

Each layer entry includes:

- **Purpose** — A brief description of what the layer is intended to do.
- **Key Arguments** — Frequently used constructor arguments.
- **Example** — A minimal code snippet showing how the layer is used in practice.

----

Dense (Fully Connected)
-----------------------

**Purpose:** Implements a standard fully connected (linear) transformation,
commonly used in neural networks built from sequential blocks.

**Key Arguments:** ``in_channels``, ``out_channels``, ``activation``

**Example:**

.. code-block:: python

   from deepchem.models.layers import Dense
   dense = Dense(in_channels=128, out_channels=64, activation='relu')
   output = dense(x)

----

Dropout
-------

**Purpose:** Randomly sets a fraction of inputs to zero during training as a
regularization technique to reduce overfitting.

**Key Arguments:** ``p`` (drop probability)

**Example:**

.. code-block:: python

   from deepchem.models.layers import Dropout
   drop = Dropout(p=0.25)
   output = drop(x)

----

GraphConv
---------

**Purpose:** A graph convolution layer used for processing molecular or general
graph-structured data. It performs message passing over neighboring nodes.

**Key Arguments:** ``in_channels``, ``out_channels``, ``activation``

**Example:**

.. code-block:: python

   from deepchem.models.layers import GraphConv
   conv = GraphConv(in_channels=64, out_channels=128, activation='relu')
   node_rep = conv(node_features, edge_index)

For implementation details, see ``deepchem/models/layers/graph_layers.py``.

----

GATConv
-------

**Purpose:** Applies graph attention to weight messages from neighboring nodes
based on learned attention scores.

**Key Arguments:** ``in_channels``, ``out_channels``, ``num_heads``

**Example:**

.. code-block:: python

   from deepchem.models.layers import GATConv
   gat = GATConv(in_channels=64, out_channels=64, num_heads=4)
   output = gat(node_features, edge_index)

----

MessagePassing
--------------

**Purpose:** Base class used to implement message-passing operations in graph
neural networks. Specific layers such as ``GraphConv`` and ``GATConv`` inherit
from this class.

**Key Arguments:** Varies depending on the subclass.

**Example:**  
See subclasses like ``GraphConv`` or ``GATConv`` for concrete usage examples.

----

ResGatedGraphConv
-----------------

**Purpose:** A gated graph convolution layer with residual connections, commonly
used for deeper or more expressive GNN architectures.

**Key Arguments:** ``in_channels``, ``out_channels``, ``activation``

**Example:**

.. code-block:: python

   from deepchem.models.layers import ResGatedGraphConv
   layer = ResGatedGraphConv(in_channels=64, out_channels=64)
   output = layer(node_features, edge_index)

----

Conv1D / Conv2D
---------------

**Purpose:** Performs 1-dimensional or 2-dimensional convolution, typically used
for sequence, spectral, or image-like data.

**Key Arguments:** ``in_channels``, ``out_channels``, ``kernel_size``, ``stride``

**Example:**

.. code-block:: python

   from deepchem.models.layers import Conv2D
   conv = Conv2D(in_channels=3, out_channels=16, kernel_size=3, stride=1)
   output = conv(image_tensor)

----

BatchNorm
---------

**Purpose:** Normalizes activations across a batch to stabilize and speed up
model training.

**Key Arguments:** ``num_features``

**Example:**

.. code-block:: python

   from deepchem.models.layers import BatchNorm
   bn = BatchNorm(num_features=64)
   output = bn(x)

----

Activation Layers (ReLU, LeakyReLU, etc.)
-----------------------------------------

**Purpose:** Applies a nonlinear activation function to the input.

**Key Arguments:** Depends on specific activation (e.g., ``negative_slope`` for LeakyReLU)

**Example:**

.. code-block:: python

   from deepchem.models.layers import ReLU
   relu = ReLU()
   output = relu(x)

----

Pooling Layers (GlobalPool, AvgPool, MaxPool)
---------------------------------------------

**Purpose:** Aggregates features across nodes or spatial positions to produce a
fixed-size output representation.

**Key Arguments:** None for most pooling operations.

**Example:**

.. code-block:: python

   from deepchem.models.layers import GlobalPool
   pool = GlobalPool()
   output = pool(node_features)

----

Extending this Cheatsheet
-------------------------

To add a new entry:

1. Locate the layer implementation under ``deepchem/models`` or
   ``deepchem/models/layers``.
2. Create a new section following the same structure used above.
3. Keep the description short and provide a concise example demonstrating usage.

References
----------

- Official DeepChem repository: https://github.com/deepchem/deepchem
- Layer code locations: ``deepchem/models`` and ``deepchem/models/layers``

----
