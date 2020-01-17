const mcVertexShaderSource = `#version 310 es
    precision highp float;
    precision highp int;

    layout(location = 0) in vec4 positionMC;
    //layout(location = 1) in vec4 normalMC;

    uniform float MCScaleFactor;
    uniform mat4 MVP;

    out vec3 TexCoord3D;
    //out vec3 Normal;

    void main()
    {
        //vec3 vertPoint = 128.0f + (MCScaleFactor *  vec3((positionMC & 1072693248u) >> 20u, (positionMC & 1047552u) >> 10u, positionMC & 1023u));
        vec3 vertPoint = vec3(positionMC.xyz);

        //Normal = normalMC.xyz;
        TexCoord3D = vertPoint / 256.0f;
        gl_Position = vec4(MVP * vec4((vertPoint - vec3(256.0f)) / 32.0f, 1.0f));

    }
`
;

const mcFragmentShaderSource = `#version 310 es
    precision highp float;
    precision highp int;
    precision highp sampler3D;
    
    uniform highp usampler3D volumeData;
    in vec3 TexCoord3D;
    //in vec3 Normal;
    
    out vec4 color;
    
    void main()
    {
        color = vec4(smoothstep(-1.0, 1.0, TexCoord3D), 1.0f);
        //color = vec4(1.0f);

    }
`
;
